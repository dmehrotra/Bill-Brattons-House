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

// im so lucky that the man inside me is on the DHS advisory council AND on the board of motorola
// MY man has nothing to hide, that's why he's so cool with me sending photo's to you.  I bet the man inside you has a bunch to hide. 
// Last night my guy entered me through the back door, watch out Google and Apple encryption.
// We have been through quite a year this past year, beginning with the demonstrations last November and December — the street demonstrations — that led to the murder of two of our police officers.