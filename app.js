var Tweeter         =       require('twitter');
var Stream          =       require('node-tweet-stream')
var Keys            =       require('./keys.js')();

// 

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
 
stream.on('tweet', function (tweet) {
  console.log('tweet received', tweet)
  client.post('statuses/update', {status: "@"+tweet.user.screen_name + " Sup"}, function(error, tweet, response){})
})

stream.track('@dmehro');

// Todo separate app and stream



var request         =       require('request');
var express         =       require("express");
var multer          =       require('multer');
var app             =       express();
var upload          =       multer({ dest: './uploads/'});
var port = process.env.PORT || 8080;

app.use(express.static('uploads'));

app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  /' + file.name)

    }
}));


app.post('/api/photo',function(req,res){
    console.log('got photo');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.redirect('/'+res.req.files.userPhoto.name)
    });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});