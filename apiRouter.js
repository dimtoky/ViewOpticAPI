//Imports
const express = require('express');
var usersController = require('./routes/usersController');
var productsController = require('./routes/productsController');
var brandsController = require('./routes/brandsController');
var orderControllers = require('./routes/ordersControllers');
var storesControllers = require('./routes/storesController');
var lensControllers = require('./routes/lensController');
var glassmakerController = require('./routes/glassmakerController');

//Router
exports.router = (function () {
    var apiRouter = express.Router();

    //User routes
    apiRouter.route('/users/register/').post(usersController.register);

    apiRouter.route('/users/login/').post(usersController.login);

    apiRouter.route('/users/').get(usersController.getusers);

    apiRouter.route('/users/id/:id').get(usersController.getuser);

    apiRouter.route('/users/update/:id').post(usersController.updateUser);

    apiRouter.route('/users/delete/').post(usersController.deleteuser);



    //Products routes
    apiRouter.route('/products/').get(productsController.getproducts);

    apiRouter.route('/products/id/:id').get(productsController.getproduct);

    apiRouter.route('/products/brandid/:id').get(productsController.getproductByBrand);

    apiRouter.route('/products/forme/:form').get(productsController.getproductByForme);

    apiRouter.route('/products/gender/:gender').get(productsController.getproductByGender);

    apiRouter.route('/products/brandforme/:forme').get(productsController.getproductByForme);

    apiRouter.route('/products/create/').post(productsController.createproduct);

    apiRouter.route('/products/update/:id').post(productsController.updateproduct);

    apiRouter.route('/products/delete/').post(productsController.deleteproduct);

    //STORE
    apiRouter.route('/stores/').get(storesControllers.getStores);

    apiRouter.route('/stores/id/:id').get(storesControllers.getStore);

    apiRouter.route('/stores/create/').post(storesControllers.createstore);

    apiRouter.route('/stores/update/:id').post(storesControllers.updatestore);

    apiRouter.route('/stores/delete/').post(storesControllers.deletestore);

    apiRouter.route('/productstores/create/').post(storesControllers.createproductstore);

    apiRouter.route('/productstores/delete/').post(storesControllers.deleteproductstore);


    //Brands routes
    apiRouter.route('/brands/').get(brandsController.getBrands);

    apiRouter.route('/brands/id/:id').get(brandsController.getBrand);

    apiRouter.route('/brands/create/').post(brandsController.createBrand);

    apiRouter.route('/brands/update/:id').post(brandsController.updateBrand);

    apiRouter.route('/brands/delete/:id').post(brandsController.deleteBrand);


    //Lens routes
    apiRouter.route('/lens/').get(lensControllers.getLenses);

    apiRouter.route('/lens/id/:id').get(lensControllers.getLens);

    apiRouter.route('/lens/create/').post(lensControllers.createLens);

    apiRouter.route('/lens/update/:id').post(lensControllers.updateLens);

    apiRouter.route('/lens/delete/:id').post(lensControllers.deleteLens);

    //Orders routes 
    apiRouter.route('/orders/').get(orderControllers.getOrders);

    apiRouter.route('/orders/id/:id').get(orderControllers.getOrder);

    apiRouter.route('/orders/create/').post(orderControllers.createOrder);

    apiRouter.route('/orders/update/:id').post(orderControllers.updateOrder);

    apiRouter.route('/orders/delete/:id').post(orderControllers.deleteOrder);

    //IMAGE routes
    apiRouter.route('/products/img/:imgpth').get(productsController.getImg);

    apiRouter.route('/products/img/add').post(productsController.postImg);

    apiRouter.route('/brands/img/:imgpth').get(brandsController.getImg);

    apiRouter.route('/brands/img/add').post(brandsController.postImg);

    apiRouter.route('/lens/img/:imgpth').get(lensControllers.getImg);

    apiRouter.route('/lens/img/add').post(lensControllers.postImg);

    //GLASSMAKERPRICES
    apiRouter.route('/glassmaker/').get(glassmakerController.getMakerPrices);

    apiRouter.route('/glassmaker/update/:id').post(glassmakerController.updateMakerPrices);


    return apiRouter;
})();