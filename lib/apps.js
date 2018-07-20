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
	configure: function (port, clientId, clientSecret, config, onInstallation) {
		var controller = Botkit.slackbot(config).configureSlackApp(
				{
					clientId: clientId,
					clientSecret: clientSecret,
					scopes: ['bot'], 
					json_file_store: config.json_file_store,
				}
				);

		controller.setupWebserver(process.env.PORT,function(err,webserver) {
			webserver.get('/slack', function(req,res) {
				if (!req.query.code) {
					res.redirect(process.env.REDIRECT_URL);
				}
				let data = {form: { 
					client_id: process.env.CLIENT_ID, 
					client_secret: process.env.CLIENT_SECRET, 
					code: req.query.code 
				}}; 
				request.post('https://slack.com/api/oauth.access', data, function (error, response, body) { 
						if (!error && response.statusCode == 200) { 
							let bot_access_token = JSON.parse(body).bot.bot_access_token;
							let access_token = JSON.parse(body).access_token;

							controller.storage.teams.save({token: bot_access_token});
							var bot = controller.spawn({token: bot_access_token});
							bot.startRTM(function(err) {
								if (err) {
									console.log(err);
								} else {
									_trackBot(bot);
								}
							})

							request.post('https://slack.com/api/team.info', {form: {token: access_token}}, function (error, response, body) {
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

					if (onInstallation) onInstallation(bot, config.createdBy);
				});
			}
		});


		controller.storage.teams.all(function (err, teams) {
			if (err) {
				throw new Error(err);
			}

			// connect all teams with bots up to slack!
			for (var t  in teams) {
				if (teams[t].token) {
					console.log(teams[t]);
					console.log(typeof teams[t]);
					var bot = controller.spawn(teams[t]).startRTM(function (err) {
						if (err) {
							console.log('Error connecting bot to Slack:', err);
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
