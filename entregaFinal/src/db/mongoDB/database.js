import mongoose from 'mongoose'
import logger from '../../logger/logger.js';
import dotenv from 'dotenv'

dotenv.config()
export const initMongoDB = async () => {

    try{
        mongoose
        .set('strictQuery', true);
        await mongoose.connect(process.env.URL_BASE_DE_DATOS)
   
        console.log(`Conectado a la base de datos` )
    } catch (error){
        logger.error(`Error en DB  ${error}`);
        console.log(`error ${error}`)
        return error
    }
}

export default class MongoDB{
    constructor(collection,schema){
        this.collection = mongoose.model(collection, schema)}

async getAll(){
    try{
    const docs = await this.collection.find()
    return docs
    }catch(error){
        console.log('error getall mongoose',error)
    }
}

async getById(id){
    try{
        const doc = await this.collection.findById(id)
        return doc
    }catch(error){
        console.log('error getById mongoose',error)
    }
}

async addProduct(product){

    try{
		const { title, value, thumbnail, stock, categoryId } = product
		const newProduct = await this.collection.create({
			title,
			value,
			thumbnail,
			stock,
			categoryId
		})
		return{
			msg: 'Subido el nuevo producto',
			data: newProduct
		}
	} catch(err){
		   console.log('error getById mongoose',err)
		  
	}
}

async getByParameters(parameters){
    try{
        const docs = await this.collection.find(parameters)
        return docs
    }catch(error){
        console.log('error parameters',error)
    }
}

async updateProduct(data, productId){
    try {

        const productUpdate = await this.collection.findByIdAndUpdate(productId, 
            data
        , { new: true })

     return productUpdate
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });

    }
}
}
