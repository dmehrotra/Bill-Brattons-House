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