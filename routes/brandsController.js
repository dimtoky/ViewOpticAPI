//Imports
var models = require('../models');
var bodyParser = require('body-parser');
var jwtUtils = require('../utils/jwt.utils');
path = require('path')

const NUMBER_REGEX = /^(0|(\+)?[1-9]{1}[0-9]{0,8}|(\+)?[1-3]{1}[0-9]{1,9}|(\+)?[4]{1}([0-1]{1}[0-9]{8}|[2]{1}([0-8]{1}[0-9]{7}|[9]{1}([0-3]{1}[0-9]{6}|[4]{1}([0-8]{1}[0-9]{5}|[9]{1}([0-5]{1}[0-9]{4}|[6]{1}([0-6]{1}[0-9]{3}|[7]{1}([0-1]{1}[0-9]{2}|[2]{1}([0-8]{1}[0-9]{1}|[9]{1}[0-5]{1})))))))))$/;
const IMAGE_PATH = path.join(__dirname, '../images/brands/');
//Routes
module.exports = {

    

//RETURN ALL PRODUCTS
    getBrands: function (req, res) {
        
        models.Brands.findAll({
            attributes: ['id', 'bname', 'createdAt']
        }).then(brands => {

            return res.status(200).json({
                'brands': brands
            });
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to get Brands' });
        });
    },
    

//RETURN ONE PRODUCTS BY ID
    getBrand: function (req, res) {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Brands.findById(req.params.id,{
            include: [
                {
                    model: models.Products
                }
            ]
        }).then(brand => {

            if (brand) {
                return res.status(200).json({
                    'brand': brand
                });
            } else {
                return res.status(404).json({ 'error': 'Brand not found' });
            }
        })
    },


//CREATE NEW PRODUCT
    createBrand: function (req, res) {

        var bname = req.body.bname;
        var bdescription = req.body.bdescription;
        var imgPath = req.body.imgPath;

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {

        models.Brands.findOne({
            where: { bname: bname },
            attributes: ['bname']
        }).then(brand => {
            if (!brand) {


                var newBrand = models.Brands.create({
                    bname: bname,
                    bdescription: bdescription,
                    imgPth: imgPath
                }).then(function (newBrand) {

                        return res.status(201).json({
                            'BrandId': newBrand.id,
                            'BrandName': newBrand.bname
                        });

                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot add Brand' });
                });

            } else {
                return res.status(409).json({ 'error': 'Brand already exist' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify Brand' });
        });  })
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided." + err})
        })
    },

//UPDATE ONE PRODUCT BY ID
    updateBrand: function (req, res) {


        var bname = req.body.bname;
        var bdescription = req.body.bdescription;
        var imgPth = req.body.imgPath;

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Brands.findById(req.params.id).then(brand => {
            if (brand) {

                brand.update({
                    bname: bname,
                    bdescription: bdescription,
                    imgPth: imgPth
                }).then(function (brand) {
                    return res.status(201).json({
                        'brandId': brand.id,
                        'brandName': brand.bname,
                        'imgPath': brand.imgPth
                    })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot updatebrand' });
                });

            } else {
                return res.status(404).json({ 'error': 'brand not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify brand' });
        });  })
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },


//DELETE ONE PRODUCT BY ID
    deleteBrand: function (req, res) {

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Brands.findById(req.params.id).then(brand => {
            if (brand) {

                brand.destroy().then(function (brand) {
                    return res.status(201).json({ 'success': 'brand deleted' })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot delete brand' });
                });

            } else {
                return res.status(404).json({ 'error': 'brand not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify brand' });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },

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
            .json({message: "Invalid auth token provided."})
        })

    }

}