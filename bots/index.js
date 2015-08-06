var Slack = require('slack-client');
var getSpellingSuggestions = require('./spellcheckerSuggestions');
var config = require('./config');

var token = config.slack.token;
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark);

// Evento de conexion a Slack
slack.on('open', function() {
  console.log('Bienvenido a Slack. Eres @' + slack.self.name + ' de ' + slack.team.name);
});

// Evento de recibir un mensaje.
slack.on('message', function (message) {
  // Ver de que canal llego el mensaje y responder a ese canal
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  // var user = slack.getUserByID(message.user).name;

  // // Hacer spellcheck
  // var suggestions = getSpellingSuggestions(message.text);

  // // Si no hay correciones, return.
  // if (!suggestions.suggestion) {
  //   return;
  // }

  // // Componer mensaje y enviar.
  // var suggestion = suggestions.suggestion;
  // var response = 'FTFY @' + user + ': ' + suggestion;
  // channel.send(response);
  channel.send('Hello, World!');
});

slack.on('error', function (error) {
  console.error('Error:', error);
});

slack.login();
