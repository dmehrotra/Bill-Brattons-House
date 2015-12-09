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
var tweets = [
"SO lucky that the man inside me is on the DHS advisory council AND on the board of motorola.$$ #helikestowatch ",
 "MY man got nothing 2 hide, thats y he cool with me sending pix 2 u.  I bet the man inside u got tons 2 hide. ",
 "Last night my guy entered me thru da back door, watch out Google & Apple encryption #RealMenDontAsk ",
 "My man been thru alot dis year GLAD he give HIS strategic respons unit machine guns 2 deal w protestors",
 "My man likes it when other people watch, he says they are just providing 'situational awareness', but I know better ;). #helikestowatch ",
 "all about control for my guy. I keep things clean cuz I dunno when hes coming home. #helike2watch ",
 "I wish PredPol would tell me when my little guy is going to get home. #helikestowatch ",
 "why u complaining...u a terrorist? #helikestowatch",
 "sweet how much da man inside me luv #BlackLivesMatter Its like he always watching them #helike2watch ",
 "The man inside of me is so strong he doesn't need to care if it's legal. #RealMenDontAsk #helike2watch ",
 "#BlackLivesMatter and dats y my man is tracking every one of u thats involved. #RealMenDontAsk"
]

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
});
var getPhoto = function(){
  file_stats = fs.statSync('./uploads/photo.jpg');
  file_size = file_stats["size"];
  if (file_size > 104200){
    return fs.readFileSync('./uploads/photo.jpg')
  }else{
    return fs.readFileSync('./uploads/google.png')
  }

} 
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
app.get('/',function(req,res){
      res.sendFile(__dirname + "/views/index.html");
});
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
      
      var data = getPhoto();
      


      // Make post request on media endpoint. Pass file data as media parameter
      client.post('media/upload', {media: data}, function(error, media, response){
        console.log(error);
        if (!error) {
          var status = {
            status: tweets[Math.floor(Math.random() * tweets.length)]+"@"+tweet.user.screen_name,
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

    stream.track('@brattonsHouse');
});


