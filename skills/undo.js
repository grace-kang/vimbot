module.exports = function(controller) {
  controller.hears(['undo', 'redo'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Undo and redo commands:\n    *u* -- undo previous action\n    *U* -- undo all changes on a line\n    *<CTRL-R>* -- Undo the undo's");
  });
}
