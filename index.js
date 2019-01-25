// Imports
const express = require('express');
const Sequelize = require('sequelize');

//instantiate
const server = express();

//configure route


server.get('/', function(req, res){
    res.setHeader('Content-Type','text/html');
    res.send('<h2>SALUT</h2>');
    console.log(req.ip.toString());
});

//launch
server.listen(8080, function(){
    console.log('En écoute');
});