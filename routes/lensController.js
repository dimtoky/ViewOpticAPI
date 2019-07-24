//Imports
var models = require('../models');
var bodyParser = require('body-parser');
var jwtUtils = require('../utils/jwt.utils');
path = require('path')

const NUMBER_REGEX = /^(0|(\+)?[1-9]{1}[0-9]{0,8}|(\+)?[1-3]{1}[0-9]{1,9}|(\+)?[4]{1}([0-1]{1}[0-9]{8}|[2]{1}([0-8]{1}[0-9]{7}|[9]{1}([0-3]{1}[0-9]{6}|[4]{1}([0-8]{1}[0-9]{5}|[9]{1}([0-5]{1}[0-9]{4}|[6]{1}([0-6]{1}[0-9]{3}|[7]{1}([0-1]{1}[0-9]{2}|[2]{1}([0-8]{1}[0-9]{1}|[9]{1}[0-5]{1})))))))))$/;
const IMAGE_PATH = path.join(__dirname, '../images/lens/');
//Routes
module.exports = {

    

//RETURN ALL PRODUCTS
    getLenses: function (req, res) {
        
        models.Lens.findAll({
            attributes: ['id', 'lName', 'lBrand', 'lType', 'lPrice']
        }).then(lenses => {

            return res.status(200).json({
                'lenses': lenses
            });
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to get lenses' });
        });
    },
    

//RETURN ONE PRODUCTS BY ID
    getLens: function (req, res) {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Lens.findById(req.params.id,{}).then(lens => {
            if (lens) {
                return res.status(200).json({
                    'lens': lens
                });
            } else {
                return res.status(404).json({ 'error': 'Lens not found' });
            }
        })
    },


//CREATE NEW PRODUCT
    createLens: function (req, res) {

        var lName = req.body.lName;
        var lBrand = req.body.lBrand;
        var lType = req.body.lType;
        var lPrice = req.body.lPrice;
        var lDescription = req.body.lDescription;
        var lImgPath = req.body.imgPath;
        var lquantity = req.body.lquantity;

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        models.Lens.findOne({
            where: { lName: lName },
            attributes: ['lName']
        }).then(lens => {
            if (!lens) {

                var newLens = models.Lens.create({
                    lName: lName,
                    lBrand: lBrand,
                    lType: lType,
                    lPrice: lPrice,
                    lDescription: lDescription,
                    lImgPath: lImgPath,
                    lquantity: lquantity
                }).then(function (newLens) {

                        return res.status(201).json({
                            'LensId': newLens.id,
                            'LensName': newLens.lName
                        });

                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot add lens' });
                });

            } else {
                return res.status(409).json({ 'error': 'lens already exist' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify lens' });
        });  })
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided." + err})
        })
    },

//UPDATE ONE PRODUCT BY ID
    updateLens: function (req, res) {


        var lName = req.body.lName;
        var lBrand = req.body.lBrand;
        var lType = req.body.lType;
        var lPrice = req.body.lPrice;
        var lDescription = req.body.lDescription;
        var lImgPath = req.body.imgPath;
        var lquantity = req.body.lquantity;

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Lens.findById(req.params.id).then(lens => {
            if (lens) {

                lens.update({
                    lName: lName,
                    lBrand: lBrand,
                    lType: lType,
                    lPrice: lPrice,
                    lDescription: lDescription,
                    lImgPath: lImgPath,
                    lquantity: lquantity
                }).then(function (lens) {
                    return res.status(201).json({
                        'LensId': lens.id,
                        'LensName': lens.lName,
                        'imgPath': lens.lImgPath
                    })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot update lens' + err});
                });

            } else {
                return res.status(404).json({ 'error': 'lens not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify lens' + err });
        });  })
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },


//DELETE ONE PRODUCT BY ID
    deleteLens: function (req, res) {

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {
        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.Lens.findById(req.params.id).then(lens => {
            if (lens) {

                lens.destroy().then(function (lens) {
                    return res.status(201).json({ 'success': 'lens deleted' })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot delete lens' });
                });

            } else {
                return res.status(404).json({ 'error': 'lens not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify lens' });
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