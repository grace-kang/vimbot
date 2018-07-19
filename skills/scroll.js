module.exports = function(controller) {
  controller.hears(['scroll', 'page', 'scrolling'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Page scrolling commands:\n    *<CTRL-B>* -- Page up\n    *<CTRL-F>* -- Page down\n    *<CTRL-U>* -- Half page up\n    *<CTRL-D>* -- Half page down\n    *<CTRL-O>* -- Jump to the previous cursor location\n    *<CTRL-E>* -- Jump to the next cursor location (after CTRL-O)\n    *<CTRL-Y>* -- Move view pane up\n    *<CTRL-E>* -- Move view pane down");
  })
}
