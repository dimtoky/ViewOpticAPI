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
    getproducts: function (req, res) {
      
        models.Products.findAll({
             attributes: ['id', 'pname', 'price', 'quantity'],
            include: [
                {
                    model: models.Brands,
                    attributes: ['bname']      
                }         
            ]
        }).then(products => {

            return res.status(200).json({
                'products': products
            });
        }).catch(function (err) {
            return res.send(err);
            //return res.status(500).json({ 'error': 'unable to get products' });
        }); 
    },

    //RETURN IMAGE
    getImg: function (req, res) {

        return res.sendFile(IMAGE_PATH + req.params.imgpth)

    },

    //ADD IMAGE
    postImg: function (req, res) {

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }

        let imageFile = req.files.image;
        var imageFileName = req.files.image.name

        imageFile.mv(IMAGE_PATH + imageFileName, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json({ 'success': 'image uploaded' });
        });; })
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided." + err})
        })

    },

    //RETURN ONE PRODUCTS BY ID
    getproduct: function (req, res) {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Products.findById(req.params.id, {
            include: [
                {
                    model: models.Brands
                },
                {
                    model: models.Stores
                }
            ]
        }).then(product => {

            if (product) {
                return res.status(200).json({
                    'product': product
                });
            } else {
                return res.status(404).json({ 'error': 'product not found' });
            }
        })
    },

    //RETURN  PRODUCTS BY BRAND
    getproductByBrand: function (req, res) {

        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Products.findAll({
            where: { idBrand: req.params.id },
            include: [
                {
                    model: models.Brands
                }
            ]
        }).then(products => {

            return res.status(200).json({
                'products': products
            });
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to get products' });
        });
    },


    //RETURN  PRODUCTS BY FORME
    getproductByForme: function (req, res) {

        models.Products.findAll({
            where: { forme: req.params.form }}).then(products => {

            return res.status(200).json({
                'products': products
            });
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to get products' });
        });
    },

    //RETURN  PRODUCTS BY GENDER
    getproductByGender: function (req, res) {

        models.Products.findAll({
            where: { gender: req.params.gender }}).then(products => {

            return res.status(200).json({
                'Gender' : req.params.gender,
                'products': products
            });
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to get products' });
        });
    },

//RETURN  PRODUCTS BY COLOR
/*getproductByBrand: function (req, res) {

    models.Products.findAll({
        where: { forme: req.params.form }}).then(products => {

        return res.status(200).json({
            'products': products
        });
    }).catch(function (err) {
        return res.status(500).json({ 'error': 'unable to get products' });
    });
},


    //RETURN  PRODUCTS BY FORME
    getproductByBrand: function (req, res) {

        models.Products.findAll({
            where: { forme: req.params.form }}).then(products => {

            return res.status(200).json({
                'products': products
            });
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to get products' });
        });
    },*/


    //CREATE NEW PRODUCT
    createproduct: function (req, res) {

        var idBrand = req.body.idBrand;
        var pname = req.body.pname;
        var price = req.body.price;
        var forme = req.body.forme;
        var description = req.body.description;
        var quantity = req.body.quantity;
        var age = req.body.age;
        var size = req.body.size;
        var rimtype = req.body.rimtype;
        var material = req.body.material;
        var gender = req.body.gender;
        var color = req.body.color;
        var imgPath1 = req.body.imgPath1;
        var imgPath2 = req.body.imgPath2;
        var imgPath3 = req.body.imgPath3;
        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {


        models.Products.findOne({
            where: { pname: pname },
            attributes: ['pname']
        }).then(product => {
            if (!product) {


                var newProduct = models.Products.create({
                    idBrand: idBrand,
                    pname: pname,
                    price: price,
                    forme: forme,
                    description: description,
                    quantity: quantity,
                    age: age,
                    gender: gender,
                    size: size,
                    couleur: color,
                    rimtype: rimtype,
                    material: material,
                    imgPath1: imgPath1,
                    imgPath2: imgPath2,
                    imgPath3: imgPath3
                }).then(function (newProduct) {

                    return res.status(201).json({
                        'productId': newProduct.id,
                        'productName': newProduct.pname


                    })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot add product' });
                });

            } else {
                return res.status(409).json({ 'error': 'product already exist' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify product' + err });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },

    //UPDATE ONE PRODUCT BY ID
    updateproduct: function (req, res) {


        var idBrand = req.body.idBrand;
        var pname = req.body.pname;
        var price = req.body.price;
        var forme = req.body.forme;
        var description = req.body.description;
        var quantity = req.body.quantity;
        var age = req.body.age;
        var size = req.body.size;
        var rimtype = req.body.rimtype;
        var material = req.body.material;
        var gender = req.body.gender;
        var color = req.body.color;
        var imgPath1 = req.body.imgPath1;
        var imgPath2 = req.body.imgPath2;
        var imgPath3 = req.body.imgPath3;
        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {

        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Products.findById(req.params.id).then(product => {
            if (product) {

                product.update({
                    idBrand: idBrand,
                    pname: pname,
                    price: price,
                    forme: forme,
                    description: description,
                    quantity: quantity,
                    age: age,
                    gender: gender,
                    size: size,
                    couleur: color,
                    rimtype: rimtype,
                    material: material,
                    imgPath1: imgPath1,
                    imgPath2: imgPath2,
                    imgPath3: imgPath3
                }).then(function (product) {
                    return res.status(201).json({
                        'productId': product.id,
                        'productName': product.pname
                    })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot update product' });
                });

            } else {
                return res.status(404).json({ 'error': 'product not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify product' });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },


    //DELETE ONE PRODUCT BY ID
    deleteproduct: function (req, res) {

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        if (!NUMBER_REGEX.test(req.body.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Products.findById(req.body.id).then(product => {
            if (product) {

                product.destroy().then(function (product) {
                    return res.status(201).json({ 'success': 'product deleted' })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot update product' });
                });

            } else {
                return res.status(404).json({ 'error': 'product not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify product' });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    }

}