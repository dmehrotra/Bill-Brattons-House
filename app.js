var app             =       express();
var request         =       require('request');
var upload          =       multer({ dest: './uploads/'});
var express         =       require("express");
var multer          =       require('multer');

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

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    console.log('got photo');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.redirect('/'+res.req.files.userPhoto.name)
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});