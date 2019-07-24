//Imports
var models = require('../models');
var bodyParser = require('body-parser');
var jwtUtils = require('../utils/jwt.utils');
path = require('path')


const NUMBER_REGEX = /^(0|(\+)?[1-9]{1}[0-9]{0,8}|(\+)?[1-3]{1}[0-9]{1,9}|(\+)?[4]{1}([0-1]{1}[0-9]{8}|[2]{1}([0-8]{1}[0-9]{7}|[9]{1}([0-3]{1}[0-9]{6}|[4]{1}([0-8]{1}[0-9]{5}|[9]{1}([0-5]{1}[0-9]{4}|[6]{1}([0-6]{1}[0-9]{3}|[7]{1}([0-1]{1}[0-9]{2}|[2]{1}([0-8]{1}[0-9]{1}|[9]{1}[0-5]{1})))))))))$/;
//Routes
module.exports = {

    //RETURN ALL PRODUCTS
    getMakerPrices: function (req, res) {
      
        models.GlassMakerPrices.findAll({   
        }).then(makerprices => {

            return res.status(200).json({
                'makerprices': makerprices
            });
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to get makerprices' });
        }); 
    },

  
    //UPDATE ONE PRODUCT BY ID
    updateMakerPrices: function (req, res) {


        var focal = req.body.focal;
        var cysp2 = req.body.cysp2;
        var cysp24 = req.body.cysp24;
        var cysp4 = req.body.cysp4;
        var novatis = req.body.novatis;
        var essilor = req.body.essilor;
        var zeiss = req.body.zeiss;
        var organic = req.body.organic;
        var polycarb = req.body.polycarb;
        var indice15 = req.body.indice15;
        var indice16 = req.body.indice16;
        var indice167 = req.body.indice167;
        var indice174 = req.body.indice174;
        var hc = req.body.hc;
        var hmc = req.body.hmc;
        var bb = req.body.bb;
        var trans = req.body.trans;
        var couleur = req.body.couleur;

        token = req.header('token');
        jwtUtils.verifyJWTToken(token)   .then((decodedToken) =>
        {

        if (!NUMBER_REGEX.test(req.params.id)) {
            return res.status(400).json({ 'error': 'invalid id' });
        }

        models.GlassMakerPrices.findById(req.params.id).then(makerprices => {
            if (makerprices) {

                makerprices.update({
                    focal: focal,
                    cysp2: cysp2,
                    cysp24: cysp24,
                    cysp4: cysp4,
                    novatis: novatis,
                    essilor: essilor,
                    zeiss: zeiss,
                    organic: organic,
                    polycarb: polycarb,
                    indice15: indice15,
                    indice16: indice16,
                    indice167: indice167,
                    indice174: indice174,
                    hc: hc,
                    hmc: hmc,
                    bb: bb,
                    trans: trans,
                    couleur: couleur
                }).then(function (makerprices) {
                    return res.status(201).json({
                        'makerpricesId': makerprices.id,

                    })
                }).catch(function (err) {
                    return res.status(409).json({ 'error': 'cannot update makerprices' });
                });

            } else {
                return res.status(404).json({ 'error': 'makerprices not found' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify makerprices' });
        });})
        .catch((err) =>
        {
          res.status(400)
            .json({message: "Invalid auth token provided."})
        })
    },


}