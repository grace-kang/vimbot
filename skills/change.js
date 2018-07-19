module.exports = function(controller) {
  controller.hears(['change', 'replace'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Change text commands:\n    *r* -- Replace the current character under cursor\n    *c* -- Change from the cursor to the motion (eg. ce will change from the cursor to the end of the word)\n    *s* -- Delete character and insert\n    *R* -- Enter replace mode\n    *S* -- Delete line and insert\n    *C* -- Delete until end of line and insert");
  })
}
