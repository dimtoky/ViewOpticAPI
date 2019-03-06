//Imports
var bcrypt = require('bcryptjs');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/;
//Routes
module.exports = {
    register: function(req, res){
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;

        if (email == null || username == null || password == null){
            return res.status(400).json({ 'error': 'missing parameters'});   
        }
        
        if ( username.length >= 13 || username.length <= 4 ){
            return res.status(400).json({ 'error': 'wrong username length'});   
        }

        if (!EMAIL_REGEX.test(email)){
            return res.status(400).json({ 'error': 'email invalid'});  
        }

        if (!PASSWORD_REGEX.test(password)){
            return res.status(400).json({ 'error': 'password invalid'});  
        }

        models.User.findOne({
            attributes: ['email'],
            where: {email: email}
        }).then(function(userFound){
            if (!userFound){
                bcrypt.hash(password, 5 , function(err,bcryptedPassword) {
                  var newUser = models.User.create({
                      email: email,
                      username: username,
                      password: bcryptedPassword,
                      isAdmin: 0
                  }) 
                  .then(function(newUser){
                      return res.status(201).json({
                          'userId': newUser.id
                      })
                  }) 
                  .catch(function(err){
                    return res.status(409).json({ 'error' : 'cannot add user' });
                }) ;
                });
            } else {
                return res.status(409).json({ 'error' : 'user already exist' });
            }

        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user'});
        });
    },

    login: function(req, res) {

        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null){
            return res.status(400).json({ 'error': 'missing parameters'});   
        }

        models.User.findOne({
            where: {email: email}
        })
        .then(function(userFound){
            if (userFound){
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt){
                        return res.status(200).json({
                            'userID':userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else{
                        return res.status(403).json({ 'error' : 'invalid password' });
                    }
                })

            } else {
                return res.status(404).json({ 'error' : 'user not exist' });
            }
               

        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'unable to verify user'});
        });

        
    },

    getUserProfile: function(req, res){
        var headerAuth = req.headers['authorization'];
    }
}