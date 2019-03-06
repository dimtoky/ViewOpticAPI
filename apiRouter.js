//Imports
const express = require('express');
var usersController = require('./routes/usersController');
var productsController = require('./routes/productsController');
var brandsController = require('./routes/brandsController');


//Router
exports.router = (function() {
    var apiRouter = express.Router();

    //User routes
    apiRouter.route('/users/register/').post(usersController.register);

    apiRouter.route('/users/login/').post(usersController.login);

    //Products routes
    apiRouter.route('/products/').get(productsController.getproducts);

    apiRouter.route('/products/id/:id').get(productsController.getproduct);

    apiRouter.route('/products/brandid/:id').get(productsController.getproductByBrand);

    apiRouter.route('/products/brandforme/:forme').get(productsController.getproductByForme);

    apiRouter.route('/products/create/').post(productsController.createproduct);

    apiRouter.route('/products/update/:id').post(productsController.updateproduct);

    apiRouter.route('/products/delete/').post(productsController.deleteproduct);

    //IMAGE
    apiRouter.route('/products/img/:imgpth').get(productsController.getImg);

    apiRouter.route('/products/img/add').post(productsController.postImg);

     //Brands routes
     apiRouter.route('/brands/').get(brandsController.getBrands);

     apiRouter.route('/brands/id/:id').get(brandsController.getBrand);
 
     apiRouter.route('/brands/create/').post(brandsController.createBrand);
 
     apiRouter.route('/brands/update/:id').post(brandsController.updateBrand);
 
     apiRouter.route('/brands/delete/:id').post(brandsController.deleteBrand);

    return apiRouter;
})();