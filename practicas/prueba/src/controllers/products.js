import {checkAdmin} from  '../middlewares/auth'
import { ProductsModel } from '../models/products'



export const getAllProducts = async (req,res) => {

    try{
        const products = await ProductsModel.find();
        res.json({
            data: products
        })

    }catch (err){
        res.status(500).json({
            error: err.message
        })
    }

}

export const getProductById = async (req, res) =>{


}