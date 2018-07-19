module.exports = function(controller) {
  controller.hears(['move', 'movement', 'nav', 'navigation', 'navigate', 'cursor'], 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, "Cursor movement commands:\n    *h j k l* -- Move left, down, up, right\n    *w* -- Move to beginning of next word\n    *b* -- Move to previous beginning of word\n    *e* -- Move to end of word\n    *W/B/E* -- Same as above but takes into account whitespace\n_Note: All the above can include a count before it. (e.g 5w moves the cursor 5 words over and 2j moves down 2 lines)_\n\n    *0* -- Move to beginning of line\n    *$* -- Move to end of line\n    *gg* -- Move to first line\n    *G* -- Move to last line\n    *<CTRL-G>* -- Get the line number of the cursor and file statys\n    *ngg/nG* -- Move to the n'th line of the file (n is a number)\n    *H* -- Move to top of screen\n    *M* -- Move to middle of screen\n    *L* -- Move to bottom of screen");
  })
}
