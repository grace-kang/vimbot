module.exports = function(controller) {
  controller.hears(['visual', 'select', 'block'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Visual mode commands:\n    *v* -- Enter visual mode\n    *V* -- Enter visual line mode\n    *<CTRL-V>* -- Enter visual block mode\n    *<ESC>* -- Exit visual modes");
  })
}
