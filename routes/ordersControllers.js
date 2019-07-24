//Imports
var models = require('../models');
var bodyParser = require('body-parser');
var jwtUtils = require('../utils/jwt.utils');
path = require('path')

const NUMBER_REGEX = /^(0|(\+)?[1-9]{1}[0-9]{0,8}|(\+)?[1-3]{1}[0-9]{1,9}|(\+)?[4]{1}([0-1]{1}[0-9]{8}|[2]{1}([0-8]{1}[0-9]{7}|[9]{1}([0-3]{1}[0-9]{6}|[4]{1}([0-8]{1}[0-9]{5}|[9]{1}([0-5]{1}[0-9]{4}|[6]{1}([0-6]{1}[0-9]{3}|[7]{1}([0-1]{1}[0-9]{2}|[2]{1}([0-8]{1}[0-9]{1}|[9]{1}[0-5]{1})))))))))$/;
const IMAGE_PATH = path.join(__dirname, '../images/products/');
//Routes
module.exports = {

//RETURN ALL PRODUCTS
    getOrders: function (req, res) {
        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        models.orders.findAll({
            attributes: ['id', 'idStore' , 'nom', 'prenom', 'tel' , 'state'],
            include: [
                {
                    model: models.Products,
                    attributes: ['pname']
                }
            ]
        }).then(orders => {

            return res.status(200).json({
                'orders': orders
            });
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to get Oders' });
        }); })
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },
    

//RETURN ONE PRODUCTS BY ID
    getOrder: function (req, res) {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.orders.findById(req.params.id,{
            include: [
                {
                    model: models.Products,
                    attributes: ['pname', 'price'],
                    include: [
                        {
                            model: models.Brands,
                            attributes: ['bname']
                        }
                    ]
                },
                {
                    model: models.Stores
                }
            ]
        }).then(orders => {

            if (orders) {
                return res.status(200).json({
                    'orders': orders
                });
            } else {
                return res.status(404).json({ 'error': 'orders not found' });
            }
        })
    },


//CREATE NEW PRODUCT
    createOrder: function (req, res) {

        var idProduct = req.body.idProduct;
        var idStore = req.body.idStore;
        var nom = req.body.nom;
        var  prenom = req.body. prenom;
        var mail = req.body.mail;
        var adresse = req.body.adresse;
        var  tel = req.body. tel;
        
        
        models.orders.findOne({
            where: { nom: nom,
                prenom: prenom,
                tel: tel
             },
            attributes: ['idProduct']
        }).then(order => {
            if (!order) {


                var newOrder = models.orders.create({
                    idProduct: idProduct,
                    idStore: idStore,
                    nom: nom,
                    prenom: prenom,
                    mail: mail,
                    adresse:adresse,
                    tel:  tel,
                    state: '1'
                }).then(function (newOrder) {



                        return res.status(201).json({
                            'OrderId': newOrder.id,
                            'OrderName': newOrder.nom
                        });
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot add Order' });
                });

            } else {
                return res.status(409).json({ 'error': 'Order already exist' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify Order' });
        });
    },

//UPDATE ONE PRODUCT BY ID
    updateOrder: function (req, res) {

        var state = req.body.state;
        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {

        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.orders.findById(req.params.id).then(order => {
            if (order) {

                order.update({
                    state: state
                }).then(function (order) {
                    return res.status(201).json({
                        'OrderId': order.id,
                        'OrderName': order.nom
                    })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot update order' });
                });

            } else {
                return res.status(404).json({ 'error': 'order not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify order' });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },


//DELETE ONE PRODUCT BY ID
    deleteOrder: function (req, res) {

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.orders.findById(req.params.id).then(order => {
            if (order) {

               order.destroy().then(function (order) {
                    return res.status(201).json({ 'success': 'order deleted' })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot delete order' });
                });

            } else {
                return res.status(404).json({ 'error': 'order not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify order' });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    }

}