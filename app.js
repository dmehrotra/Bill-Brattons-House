// Dependencies 
var request         =       require('request');
var express         =       require("express");
var multer          =       require('multer');
var app             =       express();
var upload          =       multer({ dest: './uploads/'});
var port = process.env.PORT || 8080;
var Tweeter         =       require('twitter');
var Stream          =       require('node-tweet-stream')
var Keys            =       require('./keys.js')();
var fs              =       require('fs');

// Twitter Keys
var client = new Tweeter({
  consumer_key: Keys.consumer_key,
  consumer_secret: Keys.consumer_secret,
  access_token_key: Keys.access_token_key,
  access_token_secret: Keys.access_token_secret
});

var stream = new Stream({
    consumer_key: Keys.consumer_key,
    consumer_secret: Keys.consumer_secret,
    token: Keys.access_token_key,
    token_secret: Keys.access_token_secret
})
// Make my uploads folder my public assets so that I can see the photos
app.use(express.static('uploads'));
// Upload destination for Multer
app.use(multer({ dest: './uploads/',
    // I'm keeping this in case I want to rename the file
    rename: function (fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  /' + file.name)

    }
}));
// declare post route
app.post('/api/photo',function(req,res){
    console.log('got photo');
    // upload file
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        // this redirect is for testing
      
    });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
    // When the stream gets a tweet grab the most recent photo and tweet it back at the user
    stream.on('tweet', function (tweet) {
      console.log('tweet received', tweet)
      var data = require('fs').readFileSync('./uploads/photo.jpg');
      // Make post request on media endpoint. Pass file data as media parameter
      client.post('media/upload', {media: data}, function(error, media, response){
        console.log(error);
        if (!error) {
          var status = {
            status: "Check out this photo @"+tweet.user.screen_name,
            media_ids: media.media_id_string // Pass the media id string
          }
          client.post('statuses/update', status, function(error, tweet, response){
            if (!error) {
              console.log(tweet);
            }
          });
        }
      });
    })

    stream.on('error', function (err) {
      console.log('Oh no')
    })

    console.log('running');
    stream.track('brttncm');
    stream.track('@dmehro');


});