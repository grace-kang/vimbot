var wordfilter = require('wordfilter');

module.exports = function(controller) {

  /* Collect some very simple runtime stats for use in the uptime/debug command */
  var stats = {
    triggers: 0,
    convos: 0,
  }

  controller.on('heard_trigger', function() {
    stats.triggers++;
  });

  controller.on('conversationStarted', function() {
    stats.convos++;
  });


  controller.hears(['^uptime','^debug'], 'direct_message,direct_mention', function(bot, message) {

    bot.createConversation(message, function(err, convo) {
      if (!err) {
        convo.setVar('uptime', formatUptime(process.uptime()));
        convo.setVar('convos', stats.convos);
        convo.setVar('triggers', stats.triggers);

        convo.say('My main process has been online for {{vars.uptime}}. Since booting, I have heard {{vars.triggers}} triggers, and conducted {{vars.convos}} conversations.');
        convo.activate();
      }
    });

  });

  controller.hears(['^say (.*)','^say'], 'direct_message,direct_mention', function(bot, message) {
    if (message.match[1]) {

      if (!wordfilter.blacklisted(message.match[1])) {
        bot.reply(message, message.match[1]);
      } else {
        bot.reply(message, '_sigh_');
      }
    } else {
      bot.reply(message, 'I will repeat whatever you say.')
    }
  });

  controller.hears(['hi', 'hey', 'hello', 'yo', 'greetings'], 'direct_message,direct_mention', function(bot, message) {
    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: 'robot_face',
    }, function (err) {
      if (err) {
        console.log(err)
      }
      bot.reply(message, 'Hello!')
    });
  });

  controller.on('direct_message,mention,direct_mention', function (bot, message) {
    bot.reply(message, "Sorry, I do not know any VIM commands for that. Type 'help' to see what commands I know");
  });


  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Utility function to format uptime */
  function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
      uptime = uptime / 60;
      unit = 'minute';
    }
    if (uptime > 60) {
      uptime = uptime / 60;
      unit = 'hour';
    }
    if (uptime != 1) {
      unit = unit + 's';
    }

    uptime = parseInt(uptime) + ' ' + unit;
    return uptime;
  }

};
