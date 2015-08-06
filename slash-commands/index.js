var request = require('request');
var express = require('express');
var config = require('./config');

var app = express();

var Instagram = require('instagram-node-lib');

// Set Instagram keys and global callback url.
Instagram.set('client_id', config.instagram.client_id);
Instagram.set('client_secret', config.instagram.client_secret);

var port = process.env.PORT || 3000;
app.set('port', port);

function sendMessageToSlack(tag, pictureURL) {
  var webhookURL = config.slack.webhookURL;

  var payload = {
    username: 'Instagram Bot',
    icon_url: 'http://a.deviantart.net/avatars/i/n/instahack.png?1',
    attachments: [
      {
        fallback: 'A picture of ' + tag,
        color: '#F99157',
        pretext: '/instagram ' + tag,
        image_url: pictureURL
      }
    ]
  };

  var requestOptions = {
    uri: webhookURL,
    method: 'POST',
    body: JSON.stringify(payload)
  };

  request(requestOptions);
}


app.get('/', function(req, res) {
  var tag = req.query.text;

  Instagram.tags.recent({
    name: tag,
    complete: function(result) {
      var pictureURL = result[0].images.standard_resolution.url;
      res.status(200).end();

      return sendMessageToSlack(tag, pictureURL);
    }
  });

});

app.listen(app.get('port'), function() {
  console.log('Listening at port ' + app.get('port'));
});
