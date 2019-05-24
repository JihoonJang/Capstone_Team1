let {PythonShell} = require('python-shell');
const express = require('express')
const app = express()

var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var requestIp = require('request-ip');
//.const ps = require('python-shell');
//json_data = JSON.stringify(query_data);
/*var options = {
	mode : 'text',
	pythonOptions: ['-u'],
	scriptPath: '',
	args : ['1']
};*/


let options = {
  mode: 'text',
  //thonPath: 'path/to/python',
  pythonOptions: ['-u'], // get print results in real-time
  //riptPath: 'path/to/my/scripts',
  args: ['value1', 'value2', 'value3']
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.get('/',(req,res) => res.send('Hello World!'))

app.post('/',function(req,res){
	console.log("body : " , req.body);
	console.log("ip : ", req.ip);
	res.send("양간마 황지영 양간마 황지영 안시이현 안시현 러시안룰룰룰룰룰렛");
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
});




console.log("e\n");
app.listen(8000,() => console.log('Example app listening on port 8000!'))
