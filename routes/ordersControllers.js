//Imports
var models = require('../models');
var bodyParser = require('body-parser');
path = require('path');

const NUMBER_REGEX = /^(0|(\+)?[1-9]{1}[0-9]{0,8}|(\+)?[1-3]{1}[0-9]{1,9}|(\+)?[4]{1}([0-1]{1}[0-9]{8}|[2]{1}([0-8]{1}[0-9]{7}|[9]{1}([0-3]{1}[0-9]{6}|[4]{1}([0-8]{1}[0-9]{5}|[9]{1}([0-5]{1}[0-9]{4}|[6]{1}([0-6]{1}[0-9]{3}|[7]{1}([0-1]{1}[0-9]{2}|[2]{1}([0-8]{1}[0-9]{1}|[9]{1}[0-5]{1})))))))))$/;
const IMAGE_PATH = path.join(__dirname, '../images/products/');
const ORDER_VALUE = 8;
//Routes
module.exports = {

//RETURN ALL PRODUCTS
    getOrders: function (req, res) {
        models.orders.findAll({
            include: [
                {
                    model: models.Products
                }
            ]
        }).then(orders => {

            return res.status(200).json({
                'orders': orders
            });
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to get Oders' });
        });
    },


//RETURN ONE PRODUCTS BY ID
    getOrder: function (req, res) {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.orders.findById(req.params.id,{
            include: [
                {
                    model: models.Products
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
        var nom = req.body.nom;
        var  prenom = req.body. prenom;
        var mail = req.body.mail;
        var adresse = req.body.adresse;
        var  tel = req.body. tel;
        var isDone = req.body.isDone;

        var userId = req.body.userId;

        models.orders.findOne({
            where: { idProduct: idProduct, mail: mail},
            attributes: ['idProduct']
        }).then(order => {


            if (!order) {

                var newOrder = models.orders.create({
                    idProduct: idProduct,
                    nom: nom,
                    prenom: prenom,
                    mail: mail,
                    adresse:adresse,
                    tel:  tel,
                    isDone: isDone
                    //imgPath: imageFile.name
                }).then(function (newOrder) {
                 return addProductOrderActivity(idProduct, userId, newOrder, res)

                   /* imageFile.mv(IMAGE_PATH + imageFile.name, function (err) {
                        if (err) {
                            return res.status(500).send(err);
                        }*/

                   // })
                }).catch(function (err) {
                  console.log(err);
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

        var isDone = req.body.isDone;

        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.orders.findById(req.params.id).then(order => {
            if (order) {

                order.update({
                    isDone: isDone
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
        });
    },


//DELETE ONE PRODUCT BY ID
    deleteOrder: function (req, res) {


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
        });
    }

}




async function addProductOrderActivity(idProduct, userId, newOrder, res) {
  console.log('adding activity');
  console.log('looooooooooooook');
  console.log(userId);
  console.log(userId['chin size']);
      var newProduct = models.Activities.create({
        idProduct: idProduct,
        age: userId['age'],
        beard: userId['beard'],
        gender: userId['gender'],
        mustache: userId['mustache'],
        race: userId['race'],
        chinsize: userId['chin size'],
        eyebrowscorners: userId['eyebrows corners'],
        eyebrowsposition: userId['eyebrows position'],
        eyebrowssize: userId['eyebrows size'],
        eyescorners: userId['eyes corners'],
        eyesdistance: userId['eyes distance'],
        eyesposition: userId['eyes position'],
        eyesshape: userId['eyes shape'],
        hairbeard: userId['hair beard'],
        haircolortype: userId['hair color type'],
        hairforehead: userId['hair forehead'],
        hairlength: userId['hair length'],
        hairmustache: userId['hair mustache'],
        hairsides: userId['hair sides'],
        hairtop: userId['hair top'],
        headshape: userId['head shape'],
        headwidth: userId['head width'],
        mouthcorners: userId['mouth corners'],
        mouthheight: userId['mouth height'],
        mouthwidth: userId['mouth width'],
        noseshape: userId['nose shape'],
        nosewidth: userId['nose width'],
        value: ORDER_VALUE
      }).then(function (newProduct) {

                                return res.status(201).json({
                                    'OrderId': newOrder.id,
                                    'OrderName': newOrder.nom
                                });

      }).catch(function (err) {
        console.log('erroooooor');
        console.log(err);
          return res.status(409).json({ 'error': 'cannot add DisLike' });
      });
}
