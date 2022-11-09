import { Router } from "express";
import Products from './products';
import Cart from './cart'


const mainRouter = Router()

mainRouter.use('/products', Products)
mainRouter.use('/cart', Cart)


export default mainRouter