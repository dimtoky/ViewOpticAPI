// Imports
const express = require('express');
const fileUpload = require('express-fileupload');
const Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
var multer = require('multer');
var cors = require('cors')

//instantiate
const server = express();
//var upload = multer();

//Body Parser / Multer / FileUpload
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); 
//server.use(upload.array()); 
//server.use(express.static('public'));
server.use(fileUpload());
server.use(cors());
//configure route


server.get('/', function(req, res){
    res.setHeader('Content-Type','text/html');
    res.send('<h2>SALUT</h2>');
    console.log(req.ip.toString());
});

server.use('/api/', apiRouter);

//launch
server.listen(8080, function(){
    console.log('En écoute');
});