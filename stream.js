



// var Tweeter         =       require('twitter');
// var Stream          =       require('node-tweet-stream')
// var Keys            =       require('./keys.js')();

// // 

// var client = new Tweeter({
//   consumer_key: Keys.consumer_key,
//   consumer_secret: Keys.consumer_secret,
//   access_token_key: Keys.access_token_key,
//   access_token_secret: Keys.access_token_secret
// });

// var stream = new Stream({
//     consumer_key: Keys.consumer_key,
//     consumer_secret: Keys.consumer_secret,
//     token: Keys.access_token_key,
//     token_secret: Keys.access_token_secret
//   })
 
// stream.on('tweet', function (tweet) {
//   console.log('tweet received', tweet)
//   client.post('statuses/update', {status: "@"+tweet.user.screen_name + " Sup"}, function(error, tweet, response){})
// })

// stream.on('error', function (err) {
//   console.log('Oh no')
// })

// console.log('running');
// stream.track('brttncm');
// stream.track('@dmehro');

// // Todo separate app and stream

