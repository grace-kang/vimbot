module.exports = function(controller) {
  controller.hears(['search', 'find'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Search commands:\n    */* -- Followed by a phrase searches forward for the phrase'\n    *?* -- Followed by a phrase searches backward for the phrase\n    *n* -- Go to the next occurrence in the same direction\n    *N* -- Go to the next occurence in the opposite direction");
  });
}
