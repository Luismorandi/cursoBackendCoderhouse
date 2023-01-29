import mongoose from 'mongoose'
import logger from '../logger/logger.js';
import dotenv from 'dotenv'

dotenv.config()
export const initMongoDB = async () => {

    try{
        mongoose
        .set('strictQuery', true);
        await mongoose.connect(process.env.URL_BASE_DE_DATOS)
   
        console.log(`conectado a la base de datos` )
    } catch (error){
        logger.error(`Error en DB  ${error}`);
        console.log(`error ${error}`)
        return error
    }
}

