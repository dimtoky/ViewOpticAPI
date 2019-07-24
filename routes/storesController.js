//Imports
var models = require('../models');
var bodyParser = require('body-parser');
var jwtUtils = require('../utils/jwt.utils');
path = require('path')


const NUMBER_REGEX = /^(0|(\+)?[1-9]{1}[0-9]{0,8}|(\+)?[1-3]{1}[0-9]{1,9}|(\+)?[4]{1}([0-1]{1}[0-9]{8}|[2]{1}([0-8]{1}[0-9]{7}|[9]{1}([0-3]{1}[0-9]{6}|[4]{1}([0-8]{1}[0-9]{5}|[9]{1}([0-5]{1}[0-9]{4}|[6]{1}([0-6]{1}[0-9]{3}|[7]{1}([0-1]{1}[0-9]{2}|[2]{1}([0-8]{1}[0-9]{1}|[9]{1}[0-5]{1})))))))))$/;
//Routes
module.exports = {

    getStores: function (req, res) {
      
        models.Stores.findAll({
        }).then(stores => {

            return res.status(200).json({
                'Stores': stores
            });
        }).catch(function (err) {
            return res.send(err);
            //return res.status(500).json({ 'error': 'unable to get products' });
        }); 
    },

    getStore: function (req, res) {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Stores.findById(req.params.id, {
        }).then(store => {

            if (store) {
                return res.status(200).json({
                    'store': store
                });
            } else {
                return res.status(404).json({ 'error': 'store not found' });
            }
        })
    },

     //CREATE NEW STORE
     createstore: function (req, res) {

        var storeName = req.body.storeName;
        var address = req.body.address;
        var tel = req.body.tel;
        var location = req.body.location;
        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        models.Stores.findOne({
            where: { storeName: storeName },
            attributes: ['storeName']
        }).then(store => {
            if (!store) {
                var newStore = models.Stores.create({
                    storeName: storeName,
                    address: address,
                    tel: tel,
                    location: location        
                }).then(function (newStore) {

                    return res.status(201).json({
                        'storeId': newStore.id,
                        'storeName': newStore.storeName
                    })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot add store' });
                });

            } else {
                return res.status(409).json({ 'error': 'store already exist' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify store' + err });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },

     //UPDATE ONE PRODUCT BY ID
     updatestore: function (req, res) {


        var storeName = req.body.storeName;
        var address = req.body.address;
        var tel = req.body.tel;
        var location = req.body.location;
        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {

        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Stores.findById(req.params.id).then(store => {
            if (store) {

                store.update({
                    storeName: storeName,
                    address: address,
                    tel: tel,
                    location: location
                }).then(function (store) {
                    return res.status(201).json({
                        'storeId': store.id,
                        'storeName': store.pname
                    })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot update store' });
                });

            } else {
                return res.status(404).json({ 'error': 'store not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify store' });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },

    deletestore: function (req, res) {

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        if (!NUMBER_REGEX.test(req.body.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Stores.findById(req.body.id).then(store => {
            if (store) {

                store.destroy().then(function (store) {
                    return res.status(201).json({ 'success': 'store deleted' })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot update store' });
                });

            } else {
                return res.status(404).json({ 'error': 'store not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify store' });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },

    //CREATE NEW STORE
    deleteproductstore: function (req, res) {

        var idProduct = req.body.idProduct;
        var idStore = req.body.idStore;
        token = req.header('token');
        jwtUtils.verifyJWTToken(token).then((decodedToken) =>
        {
        models.Productstore.findOne({
            where: { idProduct: idProduct,
                     idStore: idStore }
        }).then(productstore => {
            console.log(productstore);
            if (productstore) {

                productstore.destroy().then(function (productstore) {
                    return res.status(201).json({ 'success': 'productstore deleted' })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot update productstore' });
                });

            } else {
                return res.status(409).json({ 'error': 'productstore already deleted' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify productstore' + err });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided." + err})
        })
    },

     //CREATE NEW STORE
     createproductstore: function (req, res) {

        var idProduct = req.body.idProduct;
        var idStore = req.body.idStore;
        token = req.header('token');
        jwtUtils.verifyJWTToken(token).then((decodedToken) =>
        {
        models.Productstore.findOne({
            where: { idProduct: idProduct,
                     idStore: idStore },
            attributes: ['id']
        }).then(productstore => {
            console.log(productstore);
            if (!productstore) {
                var newProductstore = models.Productstore.create({
                    idProduct: idProduct,
                    idStore: idStore,      
                }).then(function (newProductstore) {

                    return res.status(201).json({
                        'productstoreId': newProductstore.id,
                        'idProduct': newProductstore.idProduct,
                        'idStore': newProductstore.idStore
                    })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot add productstore' });
                });

            } else {
                return res.status(409).json({ 'error': 'productstore already exist' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify productstore' + err });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided." + err})
        })
    }

}