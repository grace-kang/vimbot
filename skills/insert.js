module.exports = function(controller) {
  controller.hears(['insert', 'inserting'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Insert commands:\n    *i* -- Insert before the cursor\n    *a* -- Append after the cursor\n    *A* -- Append text after the end of line\n    *<ESC>* -- Exit insert mode\n    *o* -- Insert a new line below cursor\n    *O* -- Insert a new line above the cursor");
  })
}
