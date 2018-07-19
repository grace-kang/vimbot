module.exports = function(controller) {
  controller.hears(['clipboard', 'copy', 'paste', 'yank', 'put'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Clipboard commands:\n    *y* -- Yank (copy) selected text\n    *yy* -- Yank (copy) line\n    *p* -- Paste text that has just been yanked/deleted after the cursor\n    *P* -- Paste text that has just been yanked/deleted before the cursor");
  })
}
