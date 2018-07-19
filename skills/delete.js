module.exports = function(controller) {
  controller.hears(['delete', 'del'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Delete commands:\n    *x* -- Delete a character at cursor\n    *dw* -- Delete from the cursor up to the next word\n    *d$* -- Delete from the cursor to the end of the line\n    *dd* -- Delete the whole line");
  })
}
