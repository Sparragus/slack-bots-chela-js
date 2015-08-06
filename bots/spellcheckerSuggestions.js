// Spellcheck API
// Author: Montana Flynn
// URL: https://github.com/montanaflynn/Spellcheck-API
// License: MIT

var spc = require('spellchecker');

function getSpellingSuggestions(str) {
  var misspellings = false, output = {}, suggestion = [], corrections = {};
  output.original = str;

  var words = str.split(' ');
  var lastChar = getEnding(words[words.length - 1]);

  var word, noPunctuation, correctSpelling, hasMistakes, hasCorrections;
  for (var i = 0; i < words.length; i++) {

    word = words[i];
    noPunctuation = word.replace(/\W/g, '');

    if (getEnding(word)){
      word = word.slice(0, -1);
    }

    if (spc.isMisspelled(word)) {
      hasMistakes = true;
      correctSpelling = spc.getCorrectionsForMisspelling(word);
      if (correctSpelling.length) {
        hasCorrections = true;
        corrections[word] = correctSpelling;
      } else {
        corrections[word] = null;
      }
    }
  }

  for (correction in corrections) {
    if (correction && corrections[correction]) {
      var regex = new RegExp(correction, 'g');
      str = str.replace(regex, corrections[correction][0]);
    }
  }

  if (hasMistakes){
    output.suggestion = hasCorrections ? str : null;
    output.corrections = corrections;
  } else {
    output.suggestion = false;
  }

  return output;
}

function getEnding(str) {
  var lastChar = str.slice(-1);
  if (!lastChar.match(/^[0-9a-z]+$/)) {
    return lastChar;
  } else {
    return false;
  }
}

module.exports = getSpellingSuggestions;