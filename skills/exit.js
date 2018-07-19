module.exports = function(controller) {
  controller.hears(['save', 'exit', 'quit', 'saving', 'exiting', 'quitting', 'close', 'closing'], 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, "Saving and exiting commands:\n    *:w* -- Save changes\n    *:q* -- Exit Vim\n    *:q!* -- Force exit Vim\n    *:wq* -- Save changes and exit\n    *:w FILENAME* -- Saves current Vim file to disk with name FILENAME\n    *:qa* -- Close all files\n    *qa!* -- Foce close all files");
  })
}
