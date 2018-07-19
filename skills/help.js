module.exports = function(controller) {
  controller.hears('help', 'direct_message,direct_mention', function(bot, message) {
    var help_reply = "Type one of the following categories and I will list the VIM commands:\n    *move* -- Cursor movement\n    *scroll* -- Page scrolling\n    *match* -- Matching parenthesis, square bracket or curly brace\n    *insert* -- Inserting text\n    *delete* -- Deleting text\n    *change* -- Change text\n    *case* -- Change to upper/lower case\n    *exit* -- Saving and exiting\n    *clipboard* -- Yanking and pasting\n    *search* -- Search for a phrase\n    *sub* -- Search and replace\n    *visual* -- Visual mode\n    *undo* -- Undo and redo";
      bot.reply(message, help_reply);
  })
}
