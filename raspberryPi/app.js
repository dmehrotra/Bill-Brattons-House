var req = require("request");
var fs = require("fs");
var spawn = require('child_process').spawn;

spawn('raspistill',["-o","./uploads/photo.jpg"]).on("close",function(code,signal){
  console.log(code);
  var data = req.post("http://brttncm.herokuapp.com/api/photo",function(err,resp,body){
	if(err){
		console.log(er);
	}else{
		console.log(body);
	}
					
  })
  var form = data.form();
  form.append('file',fs.createReadStream("./uploads/photo.jpg"));
});

// im so lucky that the man inside me is on the DHS advisory council AND on the board of motorola.  $$$ ;).

// MY man has nothing to hide, that's why he's so cool with me sending photo's to you.  I bet the man inside you has a bunch to hide. 
// Last night my guy entered me through the back door, watch out Google and Apple encryption.
// Protests are so loud and annoying. It's terrifying.
// My man has been through a lot this year, I'm glad he is giving HIS strategic response unit machine guns to deal with all these protestors.
// My man likes it when other people watch, he says they are just providing 'situational awareness', but I know better ;).
// It's all about control for my guy. I keep things orderly because I never know when he's coming home.  
// I wish PredPol would tell me when my little guy is going to get home.  
// Isn't it sweet how much the man inside me loves Black Lives Matter. It's like he is always watching them. 


	// <!-- someth -->
	// <!-- pushing back, corpotions don't have the power that the state has.  google can't detain you at the border. -->
	// <!-- military-industrial-surveillance complex -->
	// <!-- https://www.documentcloud.org/documents/2287877-mta-blm-lasalle.html -->