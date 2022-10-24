
const {Router} = require('express');
const productsRouter = require('./products')
const uploadProduct = require('./uploadProduct')

const mainRouter = Router();

mainRouter.use('/products', productsRouter)
mainRouter.use('/uploadProduct', uploadProduct)

module.exports = mainRouter;