//Imports
var bcrypt = require('bcryptjs');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

const NUMBER_REGEX = /^(0|(\+)?[1-9]{1}[0-9]{0,8}|(\+)?[1-3]{1}[0-9]{1,9}|(\+)?[4]{1}([0-1]{1}[0-9]{8}|[2]{1}([0-8]{1}[0-9]{7}|[9]{1}([0-3]{1}[0-9]{6}|[4]{1}([0-8]{1}[0-9]{5}|[9]{1}([0-5]{1}[0-9]{4}|[6]{1}([0-6]{1}[0-9]{3}|[7]{1}([0-1]{1}[0-9]{2}|[2]{1}([0-8]{1}[0-9]{1}|[9]{1}[0-5]{1})))))))))$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/;
//Routes
module.exports = {
    register: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var idStore = req.body.idStore;
        var isAdmin = req.body.isAdmin;
        var mngBrand = req.body.mngBrand;
        var mngProduct = req.body.mngProduct;
        var mngLens = req.body.mngLens;
        var mngConfV = req.body.mngConfV;
        var mngConfL = req.body.mngConfL;
        var mngReservations = req.body.mngReservations;
        token = req.header('token');
        jwtUtils.verifyJWTToken(token).then((decodedToken) => {

            if (username == null || password == null) {
                return res.status(400).json({ 'error': 'missing parameters' });
            }

            if (username.length >= 13 || username.length <= 4) {
                return res.status(400).json({ 'error': 'wrong username length' });
            }

            if (!PASSWORD_REGEX.test(password)) {
                return res.status(400).json({ 'error': 'password invalid' });
            }

            models.User.findOne({
                attributes: ['username'],
                where: { username: username }
            }).then(function (userFound) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        var newUser = models.User.create({
                            username: username,
                            password: bcryptedPassword,
                            idStore: idStore,
                            isAdmin: isAdmin,
                            mngBrand: mngBrand,
                            mngProduct: mngProduct,
                            mngLens: mngLens,
                            mngConfV: mngConfV,
                            mngConfL: mngConfL,
                            mngReservations: mngReservations
                        })
                            .then(function (newUser) {
                                return res.status(201).json({
                                    'userId': newUser.id
                                })
                            })
                            .catch(function (err) {
                                return res.status(409).json({ 'error': 'cannot add user' });
                            });
                    });
                } else {
                    return res.status(409).json({ 'error': 'user already exist' });
                }

            })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        })
            .catch((err) => {
                res.status(400)
                    .json({ message: "Invalid auth token provided." })
            })
    },

    login: function (req, res) {

        var username = req.body.username;
        var password = req.body.password;

        if (username == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        models.User.findOne({
            attributes: ['id', 'username', 'password', 'idStore', 'isAdmin', 'mngBrand', 'mngProduct', 'mngLens', 'mngConfV', 'mngConfL', 'mngReservations', 'createdAt'],
            where: { username: username }

        })
            .then(function (userFound) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        if (resBycrypt) {
                            return res.status(200).json({
                                'user': userFound,
                                'token': jwtUtils.generateTokenForUser(userFound)
                            });
                        } else {
                            return res.status(403).json({ 'error': 'invalid password', 'code': 1 });
                        }
                    })

                } else {
                    return res.status(404).json({ 'error': 'user not exist', 'code': 2 });
                }


            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user', 'code': 3 });
            });


    },

    getusers: function (req, res) {
        token = req.header('token');
        jwtUtils.verifyJWTToken(token).then((decodedToken) => {
            models.User.findAll({
                attributes: ['id', 'username', 'idStore', 'isAdmin', 'mngBrand', 'mngProduct', 'mngLens', 'mngConfV', 'mngConfL', 'mngReservations', 'createdAt']
            }).then(users => {

                if(decodedToken.isAdmin)
                {
                return res.status(200).json({
                    'users': users
                });}
                else{
                    res.status(400).json({ message: "Accès refusé" })
                }
            }).catch(function (err) {
                return res.status(500).json({ 'error': 'unable to get users' });
            });
        })
            .catch((err) => {
                res.status(400).json({ message: "Invalid auth token provided." })
            })
    },


    getuser: function (req, res) {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }
        token = req.header('token');
        jwtUtils.verifyJWTToken(token).then((decodedToken) => {
            models.User.findById(req.params.id, {
                attributes: ['id', 'username', 'idStore', 'isAdmin', 'mngBrand', 'mngProduct', 'mngLens', 'mngConfV', 'mngConfL', 'mngReservations', 'createdAt']
            }).then(user => {

                if (user) {
                    if(decodedToken.isAdmin)
                    {
                    return res.status(200).json({
                        'user': user
                    });}
                    else{
                        res.status(400).json({ message: "Accès refusé" })
                    }
                } else {
                    return res.status(404).json({ 'error': 'user not found' });
                }
            });
        })
            .catch((err) => {
                res.status(400)
                    .json({ message: "Invalid auth token provided." })
            })
    },

    updateUser: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var idStore = req.body.idStore;
        var isAdmin = req.body.isAdmin;
        var mngBrand = req.body.mngBrand;
        var mngProduct = req.body.mngProduct;
        var mngLens = req.body.mngLens;
        var mngConfV = req.body.mngConfV;
        var mngConfL = req.body.mngConfL;
        var mngReservations = req.body.mngReservations;

        token = req.header('token');
        jwtUtils.verifyJWTToken(token).then((decodedToken) => {

            if (!NUMBER_REGEX.test(req.params.id)) {
                return res.status(400).json({ 'error': 'invalid id' });
            }
            if(decodedToken.isAdmin)
            {
            models.User.findById(req.params.id).then(user => {
                if (user) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        user.update({
                            username: username,
                            password: bcryptedPassword,
                            idStore: idStore,
                            isAdmin: isAdmin,
                            mngBrand: mngBrand,
                            mngProduct: mngProduct,
                            mngLens: mngLens,
                            mngConfV: mngConfV,
                            mngConfL: mngConfL,
                            mngReservations: mngReservations
                        }).then(function (user) {
                            return res.status(201).json({
                                'userId': user.id,
                            })
                        }).catch(function (err) {
                            return res.status(409).json({ 'error': 'cannot update user' });
                        });
                    });

                } else {
                    return res.status(404).json({ 'error': 'user not found' });
                }

            }).catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
            });}
            else{
                res.status(400).json({ message: "Accès refusé" })
            }
        })
            .catch((err) => {
                res.status(400)
                    .json({ message: "Invalid auth token provided." })
            })
    },

    
    deleteuser: function (req, res) {

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        if (!NUMBER_REGEX.test(req.body.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }
        if(decodedToken.isAdmin)
        {
        models.User.findById(req.body.id).then(user => {
            if (user) {

                user.destroy().then(function (user) {
                    return res.status(201).json({ 'success': 'user deleted' })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot update user' });
                });

            } else {
                return res.status(404).json({ 'error': 'user not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
        });}
        else{
            res.status(400).json({ message: "Accès refusé" })
        }})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    }


}