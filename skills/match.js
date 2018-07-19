module.exports = function(controller) {
  controller.hears(['match', 'matching', 'parenthesis', 'curly', 'braces', 'square', 'bracket'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Matching parenthesis, square bracket, or curly brace commands:\n    *[(* -- Go to previous (\n    *[{* -- Go to previous {\n    *%* -- Place cursor on any {, [, or { and type % to move to the matching character");
  })
}
