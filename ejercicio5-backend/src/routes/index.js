
const {Router} = require('express');
const welcome = require('./welcome');
const productsRouter = require('./products');
const uploadProducts = require('./uploadProducts')

const mainRouter = Router();

mainRouter.use('/', welcome)




module.exports = mainRouter;