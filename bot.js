require('dotenv').config();

/**
 *  * Configure the persistence options
 *   */

var config = {};
if (process.env.MONGOLAB_URI) {
	var BotkitStorage = require('botkit-storage-mongo');
	config = {
		storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
		retry: 3,
	};
} else {
	config = {
		json_file_store: 'db',
		retry: 3,
	};
}

if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.PORT) {
	var app =  require('./lib/apps');
	var controller = app.configure(process.env.PORT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, config);
} else {
	console.log('Error: Please specify CLIENTID, CLIENTSECRET, and PORT in the environment');
	process.exit(1);
}

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
	require("./skills/" + file)(controller);
});


// Handle events related to the websocket connection to Slack
controller.on('rtm_open', function (bot, err) {
	console.log('** The RTM api just connected!');
});

controller.on('rtm_close', function (err,bot) {
	if (err) {
		console.log('RTM close error: ' + err);
	}
	console.log('** The RTM api just closed');
});

controller.on('rtm_reconnect_failed', function(bot) {
	console.log('Error reconnecting to RTM api');
	let token = bot.config.token;
	controller.storage.teams.delete(token);
});

// Ping app every 5 minutes to keep dyno awake
var http = require("http");
setInterval(function() {
	http.get("https://vimbot.herokuapp.com");
}, 300000);
