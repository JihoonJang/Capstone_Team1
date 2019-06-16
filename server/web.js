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


const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();



router.post('/upload',upload.single('image'),(req,res,next,error) => {
	console.log(error);

});
module.exports = router;
/*
let options = {
  mode: 'text',
  //thonPath: 'path/to/python',
  pythonOptions: ['-u'], // get print results in real-time
  //riptPath: 'path/to/my/scripts',
  args: ['value1', 'value2', 'value3']
};

*/
var ard;
var dat;
var par;
app.get('/',function(req,res){
	console.log("body : ", req.body);
	if( par == '1')
	{
		ard = '16,48,24,4,36,20,1,15';
	}
	if( par =='2'){
		ard = '17,5,56,44,52,28,41,22';
	}
	if( par == '3')
	{
		ard = '41,22,26,37,35,19,50,49';
	}
	if(par == '4')
	{
		ard = '25,38';
	}
	if(par == '6')
	{
		ard = '31,41,53,12,13,15';
	}
	console.log(ard);
	res.send(ard);

})

app.post('/', async function(req,res){
	//var dataa = req.body;
	dat = JSON.stringify(req.body.data);
	par = JSON.stringify(req.body.param);
	console.log("aefeafew fae e");
	console.log("data :  " , dat);

	console.log("param : " , par);
	console.log("ip : ", req.ip);

	if(par == '7' || par == '6')
	{
		fs.writeFile('file.txt',dat,'utf8',async function(error,data){
			if (error) throw error;
	if( par == '7')
	{

	  let option = {
                        mode: 'text',
                         pythonOptions: ['-u'], // get print results in real-time
                         args: [1]
        };
        PythonShell.run('IMG.py', option, await function (err, results) {
                if (err) throw err;
                console.log('results:\n');
        });
	const fileName = 'some_image.jpg';
	const [result] = await client.textDetection(fileName);
	const detections = result.textAnnotations;
	console.log('Text:');
	console.log(detections[0].description);
	//console.log(detections);
	res.send(detections[0].description);
//	var te;
//	detections.forEach(text =>{
		//console.log(text);
		//res.send((text.description));
		//console.log('finishi');
		//te = text.description;
		/*
		te = JSON.stringify(text.descriptions);
		console.log(te)
			let options3 = {
  					 mode: 'text',
 					 pythonOptions: ['-u'], // get print results in real-time
 					 args: [text.descriptions, 'value2', 'value3']
			};
			PythonShell.run('trans.py', options3, function (err, results) {
		
			if (err) throw err;
			ard = results;
	  		console.log(typeof(results));
  			console.log((results));
			});
*/
//	});
		//console.log(te);
	}
		});
	}
	if( par == '5'){
		let options = {
  				 mode: 'text',
 				 pythonOptions: ['-u'], // get print results in real-time
 				 args: ['value', 'value2', 'value3']
		};
		PythonShell.run('not.py', options, function first(err, results) {
		
			if (err) throw err;
			ard = results;
			console.log("first");
	  		console.log(typeof(results));
  			console.log((results));
			let options2 = {
  					 mode: 'text',
 					 pythonOptions: ['-u'], // get print results in real-time
 					 args: [ard, 'value2', 'value3']
			};
			PythonShell.run('trans.py', options2, function second(err, results) {
		
			if (err) throw err;
			ard = results;
	  		console.log(typeof(results));
  			console.log((results));
			res.send(JSON.stringify(results));
			});
		});




	}

	if( par == '1' || par == '2' || par == '3'  || par =='4'){
		req.body.data = '가나다';
	}
	

});




console.log("e\n");
app.listen(8000,() => console.log('Example app listening on port 8000!'))
