const express = require('express')
const app = express()

var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var requestIp = require('request-ip');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/',(req,res) => res.send('Hello World!'))

app.post('/',function(req,res){
	console.log("body : " , req.body);
	console.log("ip : ", req.ip);
	res.send("양간마");
});




console.log("e\n");
app.listen(8000,() => console.log('Example app listening on port 8000!'))
