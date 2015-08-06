var request = require('request');
var config = require('./config');

var TwitterAPI = require('twitter');
var twitter = new TwitterAPI({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

var hashtag = 'tacos';

var webhookURL = config.slack.webhookURL;

twitter.stream('statuses/filter', {track: hashtag}, function(stream) {
  stream.on('data', function(tweet) {
    var tweetUser = tweet.user.screen_name;
    var tweetText = tweet.text;

    console.log(tweetUser, tweetText);

    var payload = {
      username: 'Tacos de México',
      icon_url: 'http://hilahcooking.com/wp-content/uploads/2010/06/tacos-al-pastor.jpg',

      fallback: '@' + tweetUser + ': ' + tweetText,

      pretext: 'Tacos <3',

      color: '#33aaff',

      fields: [{
        title: '@' + tweetUser,
        value: tweetText,
        short: false
      }],

      unfurl_links: false
    };

    var requestOptions = {
      uri: webhookURL,
      method: 'POST',
      body: JSON.stringify(payload)
    };

    request(requestOptions);
  });
});
