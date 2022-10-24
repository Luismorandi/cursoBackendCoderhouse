
const {Router} = require('express');
const productsRouter = require('./products')


const mainRouter = Router();

mainRouter.use('/', productsRouter)


module.exports = mainRouter;