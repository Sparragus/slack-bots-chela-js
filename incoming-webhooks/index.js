var request = require('request');
var config = require('./config');

var webhookURL = config.slack.webhookURL;

var payload = {
  text: 'Hello, World!',
  username: 'ChelaJS',
  icon_emoji: ':beers:'
};

var requestOptions = {
  uri: webhookURL,
  method: 'POST',
  body: JSON.stringify(payload)
};

request(requestOptions);
