let {PythonShell} = require('python-shell');
const express = require('express')
const app = express()

var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var requestIp = require('request-ip');
var fs = require('fs');

const router = express.Router();
const multer = require('multer');
let upload = multer({dest : 'uploads/'});

app.use(bodyParser.json({limit: '50mb', extended: false}))
app.use(bodyParser.urlencoded({limit: '50mb', extended:false}))


router.post('/upload',upload.single('image'),(req,res,next,error) => {
	console.log(error);

});
module.exports = router;
let options = {
  mode: 'text',
  //thonPath: 'path/to/python',
  pythonOptions: ['-u'], // get print results in real-time
  //riptPath: 'path/to/my/scripts',
  args: ['value1', 'value2', 'value3']
};app.get('/',function(req,res){
	console.log("body : ", req.body);
	res.send('Hello World!');
})

app.post('/',function(req,res){
	//var dataa = req.body;
	var dat = JSON.stringify(req.body.data);
	console.log("aefeafew fae e");
	console.log("body : " , dat);
	console.log("ip : ", req.ip);
	fs.writeFile('file.txt',dat,'utf8', function(error,data){
		console.log(error)
	});
	res.send("양간마 양간마 안시이현 안시현 러시안룰룰룰룰룰렛 장지훈 모태솔로로로로로로 양간마 안시현 인간티머니");
	let options = {
  			mode: 'text',
  			//thonPath: 'path/to/python',
 			 pythonOptions: ['-u'], // get print results in real-time
  			//riptPath: 'path/to/my/scripts',
 			 args: [req.body.param, 'value2', 'value3']
	};
	PythonShell.run('trans.py', options, function (err, results) {
		if (err) throw err;


  		//results is an array consisting of messages collected during execution
  		console.log('results: %j', results);
	});

	  let option = {
                        mode: 'text',
                        //thonPath: 'path/to/python',
                         pythonOptions: ['-u'], // get print results in real-time
                        //riptPath: 'path/to/my/scripts',
                         args: [1]
        };
        PythonShell.run('IMG.py', option, function (err, results) {
                if (err) throw err;
                console.log('results:\n');
        });

});




console.log("e\n");
app.listen(8000,() => console.log('Example app listening on port 8000!'))
