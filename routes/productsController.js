//Imports
var models = require('../models');
var bodyParser = require('body-parser');
var http = require("http");
var querystring = require('querystring');
var g = require('ger');
var fs = require('fs');

var esm = new g.MemESM();
var ger = new g.GER(esm);
path = require('path');



const NUMBER_REGEX = /^(0|(\+)?[1-9]{1}[0-9]{0,8}|(\+)?[1-3]{1}[0-9]{1,9}|(\+)?[4]{1}([0-1]{1}[0-9]{8}|[2]{1}([0-8]{1}[0-9]{7}|[9]{1}([0-3]{1}[0-9]{6}|[4]{1}([0-8]{1}[0-9]{5}|[9]{1}([0-5]{1}[0-9]{4}|[6]{1}([0-6]{1}[0-9]{3}|[7]{1}([0-1]{1}[0-9]{2}|[2]{1}([0-8]{1}[0-9]{1}|[9]{1}[0-5]{1})))))))))$/;
const IMAGE_PATH = path.join(__dirname, '../images/products/');
const FACE_ATTR_PATH = path.join(__dirname, '../faceAttributes.json');
const FACE_WEIGHT_PATH = path.join(__dirname, '../faceAttributesWeights.json');
const LIKE_VALUE = 4;
const DISLIKE_VALUE = -4;
const VIEW_VALUE = 1;

var rawdata = fs.readFileSync(FACE_ATTR_PATH);
let json_face_attributes = JSON.parse(rawdata);

var rawdataw = fs.readFileSync(FACE_WEIGHT_PATH);
let json_face_attributes_weights = JSON.parse(rawdataw);
//Routes
module.exports = {

  //RETURN ALL PRODUCTS
  getproducts: function(req, res) {
    models.Products.findAll({
      include: [{
        model: models.Brands
      }]
    }).then(products => {

      return res.status(200).json({
        'products': products
      });
    }).catch(function(err) {
      return res.status(500).json({
        'error': 'unable to get products'
      });
    });
  },

  //RETURN IMAGE
  getImg: function(req, res) {

    return res.sendFile(IMAGE_PATH + req.params.imgpth)

  },

  //ADD IMAGE
  postImg: function(req, res) {

    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }

    let imageFile = req.files.image;
    var imageFileName = req.files.image.name

    imageFile.mv(IMAGE_PATH + imageFileName, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json({
        'success': 'image uploaded'
      });
    });

  },

  //RETURN ONE PRODUCTS BY ID
  getproduct: function(req, res) {
    if (!NUMBER_REGEX.test(req.params.id)) {
      return res.status(400).json({
        'error': 'invalid id'
      });
    }

    models.Products.findById(req.params.id, {
      include: [{
        model: models.Brands
      }]
    }).then(product => {

      if (product) {
        return res.status(200).json({
          'product': product
        });
      } else {
        return res.status(404).json({
          'error': 'product not found'
        });
      }
    })
  },

  //RETURN  PRODUCTS BY BRAND
  getproductByBrand: function(req, res) {

    if (!NUMBER_REGEX.test(req.params.id)) {
      return res.status(400).json({
        'error': 'invalid id'
      });
    }

    models.Products.findAll({
      where: {
        idBrand: req.params.id
      },
      include: [{
        model: models.Brands
      }]
    }).then(products => {

      return res.status(200).json({
        'products': products
      });
    }).catch(function(err) {
      return res.status(500).json({
        'error': 'unable to get products'
      });
    });
  },


  //RETURN  PRODUCTS BY FORME
  getproductByForme: function(req, res) {

    models.Products.findAll({
      where: {
        forme: req.params.form
      }
    }).then(products => {

      return res.status(200).json({
        'products': products
      });
    }).catch(function(err) {
      return res.status(500).json({
        'error': 'unable to get products'
      });
    });
  },

  //RETURN  PRODUCTS BY GENDER
  getproductByGender: function(req, res) {

    models.Products.findAll({
      where: {
        gender: req.params.gender
      }
    }).then(products => {

      return res.status(200).json({
        'Gender': req.params.gender,
        'products': products
      });
    }).catch(function(err) {
      return res.status(500).json({
        'error': 'unable to get products'
      });
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
  createproduct: function(req, res) {


console.log('im ikkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkn');
    var idBrand = req.body.idBrand;
    var pname = req.body.pname;
    var price = req.body.price;
    var forme = req.body.forme;
    var description = req.body.description;
    var isAvailable = req.body.isAvailable;
    var age = req.body.age;
    var size = req.body.size;
    var rimtype = req.body.rimtype;
    var material = req.body.material;
    var gender = req.body.gender;
    var color = req.body.color;
    var imgPath1 = req.body.imgPath1;
    var imgPath2 = req.body.imgPath2;
    var imgPath3 = req.body.imgPath3;



    models.Products.findOne({
      where: {
        pname: pname
      },
      attributes: ['pname']
    }).then(product => {
      if (!product) {


        var newProduct = models.Products.create({
          idBrand: idBrand,
          pname: pname,
          price: price,
          forme: forme,
          description: description,
          isAvailable: isAvailable,
          age: age,
          gender: gender,
          size: size,
          couleur: color,
          rimtype: rimtype,
          material: material,
          imgPath1: imgPath1,
          imgPath2: imgPath2,
          imgPath3: imgPath3
        }).then(function(newProduct) {

          return res.status(201).json({
            'productId': newProduct.id,
            'productName': newProduct.pname


          })
        }).catch(function(err) {
          return res.status(409).json({
            'error': 'cannot add product'
          });
        });

      } else {
        return res.status(409).json({
          'error': 'product already exist'
        });
      }

    }).catch(function(err) {
      return res.status(500).json({
        'error': 'unable to verify product' + err
      });
    });
  },


  //UPDATE ONE PRODUCT BY ID
  updateproduct: function(req, res) {


    var idBrand = req.body.idBrand;
    var pname = req.body.pname;
    var price = req.body.price;
    var forme = req.body.forme;
    var description = req.body.description;
    var isAvailable = req.body.isAvailable;
    var age = req.body.age;
    var size = req.body.size;
    var rimtype = req.body.rimtype;
    var material = req.body.material;
    var gender = req.body.gender;
    var color = req.body.color;
    var imgPath1 = req.body.imgPath1;
    var imgPath2 = req.body.imgPath2;
    var imgPath3 = req.body.imgPath3;

    if (!NUMBER_REGEX.test(req.params.id)) {
      return res.status(400).json({
        'error': 'invalid id'
      });
    }

    models.Products.findById(req.params.id).then(product => {
      if (product) {

        product.update({
          idBrand: idBrand,
          pname: pname,
          price: price,
          forme: forme,
          description: description,
          isAvailable: isAvailable,
          age: age,
          gender: gender,
          size: size,
          couleur: color,
          rimtype: rimtype,
          material: material,
          imgPath1: imgPath1,
          imgPath2: imgPath2,
          imgPath3: imgPath3
        }).then(function(product) {
          return res.status(201).json({
            'productId': product.id,
            'productName': product.pname
          })
        }).catch(function(err) {
          return res.status(409).json({
            'error': 'cannot update product'
          });
        });

      } else {
        return res.status(404).json({
          'error': 'product not found'
        });
      }

    }).catch(function(err) {
      return res.status(500).json({
        'error': 'unable to verify product'
      });
    });
  },


  //DELETE ONE PRODUCT BY ID
  deleteproduct: function(req, res) {


    if (!NUMBER_REGEX.test(req.body.id)) {
      return res.status(400).json({
        'error': 'invalid id'
      });
    }

    models.Products.findById(req.body.id).then(product => {
      if (product) {

        product.destroy().then(function(product) {
          return res.status(201).json({
            'success': 'product deleted'
          })
        }).catch(function(err) {
          return res.status(409).json({
            'error': 'cannot update product'
          });
        });

      } else {
        return res.status(404).json({
          'error': 'product not found'
        });
      }

    }).catch(function(err) {
      return res.status(500).json({
        'error': 'unable to verify product'
      });
    });
  },









  //RETURN ONE PRODUCTS BY ID
  postproduct: function(req, res) {
    if (!NUMBER_REGEX.test(req.params.id)) {
      return res.status(400).json({
        'error': 'invalid id'
      });
    }

    models.Products.findById(req.params.id, {
      include: [{
        model: models.Brands
      }]
    }).then(product => {

      if (product) {
        return addProductViewActivity(req.params.id, req.body.userId, product, res);

      } else {
        return res.status(404).json({
          'error': 'product not found'
        });
      }
    })
  },
  //Like a product
  postlike: function(req, res) {

    var userId = req.body.userId;
    var idProduct = req.body.idProduct;


    models.Activities.findOne({
      where: {
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
        value: DISLIKE_VALUE
        }
    }).then(activitie => {
      if(!activitie) {

            var newActivitie = models.Activities.create({
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
              value: LIKE_VALUE
            }).then(function(newActivitie) {

              return res.status(201).json({
                'productId': idProduct

              })
            }).catch(function(err) {
              return res.status(409).json({
                'error': 'cannot add Like'
              });
            });
      }
      else {
        activitie.destroy().then(function(newActivitie) {

          return res.status(201).json({
            'productId': idProduct

          })
        }).catch(function(err) {
          return res.status(409).json({
            'error': 'cannot add Like'
          });
        });

      }
    });
  },

  postdislike: function(req, res) {
    var userId = req.body.userId;
    var idProduct = req.body.idProduct;


    models.Activities.findOne({
      where: {
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
        value: LIKE_VALUE
        }
    }).then(activitie => {
      if(!activitie) {

            var newActivitie = models.Activities.create({
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
              value: DISLIKE_VALUE
            }).then(function(newActivitie) {

              return res.status(201).json({
                'productId': idProduct

              })
            }).catch(function(err) {
              return res.status(409).json({
                'error': 'cannot add DisLike'
              });
            });
      }
      else {
        console.log(activitie.dataValues);
        activitie.destroy().then(function(newActivitie) {

          return res.status(201).json({
            'productId': idProduct

          })
        }).catch(function(err) {
          return res.status(409).json({
            'error': 'cannot add DisLike'
          });
        });

      }
    });
  },
  postUserImage: function(req, res) {

    var face_attributes = ["age",
      "beard",
      "gender",
      "mustache",
      "race",
      "chin size",
      "eyebrows corners",
      "eyebrows position",
      "eyebrows size",
      "eyes corners",
      "eyes distance",
      "eyes position",
      "eyes shape",
      "hair beard",
      "hair color type",
      "hair forehead",
      "hair length",
      "hair mustache",
      "hair sides",
      "hair top",
      "head shape",
      "head width",
      "mouth corners",
      "mouth height",
      "mouth width",
      "nose shape",
      "nose width"
    ];

    var bImage = req.body.base64;
    var responseString = "";
    var bImage = bImage.replace(/^data:image\/[a-z]+;base64,/, "");

    var data = JSON.stringify({
      api_key: "d45fd466-51e2-4701-8da8-04351c872236",
      file_base64: bImage,
      detection_flags: "classifiers,extended",
      recognize_targets: [
        "all@mynamespace"
      ],
      original_filename: "sample.png"
    });
    var options = {
      host: "www.betafaceapi.com",
      path: "/api/v2/media",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    };
    var requ = http.request(options, function(resp) {
      responseString = "";

      resp.on("data", function(data) {
        responseString += data;

        // save all the data from response
      });
      resp.on("end", function() {
        var body = JSON.parse(responseString);

        var tags = body.media.faces[0].tags;

        var userId = {};

        //console.log(tags);
        for (var i = 0; i < tags.length; i++) {
          var obj = tags[i];
          if (face_attributes.indexOf(obj.name) > -1) {
            var value = "";
            var name = "";
            name = obj.name;
            value = obj.value;
            if (obj.name == "age") {

              if (value < 13) {
                value = "kid";
              } else if (value >= 13 && value < 18) {
                value = "teen";
              } else if (value >= 18 && value < 35) {
                value = "young adult";
              } else if (value >= 35 && value < 55) {
                value = "adult";
              } else if (value >= 55) {
                value = "senior";
              }
            }
            userId[name] = json_face_attributes[name].indexOf(value);
          }
        }


        return res.status(200).json({
          'userId': userId
        });
        // print to console when response ends
      });
    });

    requ.write(data);
    requ.end();

  },

  recommendProducts: function(req, res) {

    console.log(models);
    const Op = models;
    var userId = req.body.userId;
    models.Activities.findAll({
      where: {
        $or: [{
            age: userId['age']
          },
          {
            beard: userId['beard']
          }, {
            gender: userId['gender']
          }, {
            mustache: userId['mustache']
          }, {
            race: userId['race']
          }, {
            chinsize: userId['chin size']
          }, {
            eyebrowscorners: userId['eyebrows corners']
          }, {
            eyebrowsposition: userId['eyebrows position']
          }, {
            eyebrowssize: userId['eyebrows size']
          }, {
            eyescorners: userId['eyes corners']
          }, {
            eyesdistance: userId['eyes distance']
          }, {
            eyesposition: userId['eyes position']
          }, {
            eyesshape: userId['eyes shape']
          }, {
            hairbeard: userId['hair beard']
          }, {
            haircolortype: userId['hai rcolor type']
          }, {
            hairforehead: userId['hair forehead']
          }, {
            hairlength: userId['hair length']
          }, {
            hairmustache: userId['hair mustache']
          }, {
            hairsides: userId['hair sides']
          }, {
            hairtop: userId['hair top']
          }, {
            headshape: userId['head shape']
          }, {
            headwidth: userId['head width']
          }, {
            mouthcorners: userId['mouth corners']
          }, {
            mouthheight: userId['mouth height']
          }, {
            mouthwidth: userId['mouth width']
          }, {
            noseshape: userId['nose shape']
          }, {
            nosewidth: userId['nose width']
          }
        ]
      }
    }).then(activities => {

if(activities) {

      // json_face_attributes_weights
      var productValues = new Map();
      tempuserId = {};
      for(var attribute in userId){
        tempuserId[attribute.replace(/\s/g, '')] = userId[attribute];
      }
      activities.forEach((activitie) => {
        //console.log(activitie.dataValues);
        data = activitie.dataValues;
        var value = data.value;
        var calculatedvalue = 0;
        for (attribute in json_face_attributes_weights) {
          if (tempuserId[attribute] == data[attribute]) {
            calculatedvalue += value * json_face_attributes_weights[attribute];
          } else {
            calculatedvalue += value;
          }
        }
        if (productValues.has(data.idProduct)) {
          productValues.set(data.idProduct, productValues.get(data.idProduct) + calculatedvalue);
        } else {
          productValues.set(data.idProduct, calculatedvalue);
        }
      });

      //console.log(productValues);
      var sortable = [];
      for (var entry of productValues.entries()) {
        var key = entry[0],
          value = entry[1];
        // console.log(key + " = " + value);
        sortable.push([key, value]);

      }

      sortable.sort(function(a, b) {
        return b[1] - a[1];
      });

      console.log(sortable);

      var fielder = [];

      sortable.forEach(function(value) {
        console.log(value);
        fielder.push(value[0]);
      });
      console.log(fielder);



      models.Products.findAll({
        include: [{
          model: models.Brands
        }],
        where: {
          id: {
            $or: fielder
          }
        },
         order: [[models.sequelize.fn('field', models.sequelize.col('Products.id'), fielder), 'ASC']],
         limit: req.body.limit

      }).then(products => {

        //console.log(models.sequelize);

        return res.status(200).json({
          'products': products
        });
      }).catch(function(err) {
        console.log(err);
        return res.status(500).json({
          'error': 'unable to get products'
        });
      });
}
      else {
        return res.status(200).json({
          'products': 0
        });
      }
    }).catch(function(err) {
      console.log(err);
      return res.status(500).json({
        'error': 'unable to get activities'
      });
    });
  },

  viewActivity: function(req, res) {
    var idProduct = req.body.idProduct;
    var userId = req.body.userId;
    return addProductViewActivity(idProduct, userId, idProduct, res);
  }

}

function addProductViewActivity(idProduct, userId, product, res){
  console.log('im iiiiiiiiiiiiiiiin');
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
    value: VIEW_VALUE
  }).then(function(newProduct) {
    return res.status(200).json({
      'product': product
    });
    console.log('error inserting activity');
  }).catch(function(err) {
    console.log('error inserting activity');
  });
}
