/**
 *  * Helpers for configuring a bot as an app
 *   * https://api.slack.com/slack-apps
 *    */

var Botkit = require('botkit');
var path = require('path');
const request = require('request');

var _bots = {};

function _trackBot(bot) {
	_bots[bot.config.token] = bot;
}

function die(err) {
	console.log(err);
	process.exit(1);
}

module.exports = {
	configure: function (port, clientId, clientSecret, config) {

		// Create the Slackbot controller
		var controller = Botkit.slackbot(config).configureSlackApp(
				{
					clientId: clientId,
					clientSecret: clientSecret,
					scopes: ['bot'], 
					json_file_store: config.json_file_store,
				}
				);

		// Set up Express.js web server at specified PORT
		controller.setupWebserver(process.env.PORT,functi on(err,webserver) {

			// Handle app installation for workspaces
			webserver.get('/slack', function(req,res) {
				if (!req.query.code) {
					res.redirect(process.env.REDIRECT_URL);
				}

				let data = {form: { 
					client_id: process.env.CLIENT_ID, 
					client_secret: process.env.CLIENT_SECRET, 
					code: req.query.code 
				}}; 

				// Exchange code for access token, add token to db and start RTM
				request.post('https://slack.com/api/oauth.access', data, function (error, response, body) { 
						if (!error && response.statusCode == 200) { 
							let bot_access_token = JSON.parse(body).bot.bot_access_token;

							controller.storage.teams.save({id: bot_access_token});
							var bot = controller.spawn({token: bot_access_token});
							bot.startRTM(function(err) {
								if (err) {
									console.log(err);
								} else {
									_trackBot(bot);
								}
							})

							// Redirect user to their workspace after successful installation
							request.post('https://slack.com/api/team.info', {form: {token: bot_access_token}}, function (error, response, body) {
								if (!error && response.statusCode == 200) {
									if(JSON.parse(body).error == 'missing_scope') {
										console.log('Error: could not retrieve team info');
										res.send('VimBot has been added to your team!');
									} else {
										let team = JSON.parse(body).team.domain;
										res.redirect('http://' +team+ '.slack.com');
									}
								}
							});
						}
				});
			})

			controller.createWebhookEndpoints(controller.webserver);

			controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
				if (err) {
					res.status(500).send('ERROR: ' + err);
				} else {
					res.send('Success!');
				}
			});
		});

		controller.on('create_bot', function (bot, config) {
			if (_bots[bot.config.token]) {
			} else {
				bot.startRTM(function (err) {
					if (err) {
						die(err);
					}
					_trackBot(bot);
				});
			}
		});

		// Spawn bots and start RTMs for all teams in database	
		controller.storage.teams.all(function (err, teams) {
			if (err) {
				throw new Error(err);
			}

			// connect all teams with bots up to slack!
			for (var t  in teams) {
				if (teams[t].id) {
					var bot = controller.spawn({ token: teams[t].id }).startRTM(function (err) {
						if (err) {
							console.log('Error connecting bot to Slack:', err);
							if (err == 'account_inactive') {
								controller.storage.teams.delete(teams[t].id, function(err) {
									if (err) {
										console.log(err);
									}
								})
							}
						} else {
							_trackBot(bot);
						}
					});
				}
			}

		});
		return controller;
	}
}
