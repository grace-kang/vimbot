module.exports = function(controller) {
  controller.hears(['case', 'lowercase', 'uppercase'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Uppercase and lowercase commands:\n    ~ -- Toggle case for the character at the cursor\n    *gU* -- Change to uppercase\n    *gu* -- Change to lowercase\n    *gUU* -- Change current line to uppercase\n    *guu* -- Change current line to lowercase\n_Note: These work in both normal and visual mode_");
  })
}
