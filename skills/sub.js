module.exports = function(controller) {
  controller.hears(['sub', 'substitute'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Search and replace commands:\n    *:s/old/new* -- Sub 'new' for the first 'old' in a line\n    *:s/old/new/g* -- Sub 'new' for all 'old's on a line\n    *:#,#s/old/new/g* -- Sub phrases between two line #'s\n    *:%s/old/new/g* -- Sub all occurences in the file\n    *:%s/old/new/gc* -- Ask for confirmation each time");
  })
}
