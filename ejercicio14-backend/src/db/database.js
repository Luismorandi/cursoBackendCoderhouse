import mongoose from 'mongoose'
import logger from '../logger/logger.js';

import config from "../config/config.js";
export const initMongoDB = async () => {

    try{
        mongoose
        .set('strictQuery', true);
        await mongoose.connect(config.URL_BASE_DE_DATOS)
   
        console.log(`conectado a la base de datos` )
    } catch (error){
        logger.error(`Error en DB  ${error}`);
        console.log(`error ${error}`)
        return error
    }
}

