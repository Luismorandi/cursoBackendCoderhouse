import mongoose from 'mongoose'
import Config from '../config/index.js'

export const initDb = async () => {
    

    try{
        mongoose.set('strictQuery', true);
       mongoose.connect(Config.MONGO_ATLAS_URL)
        console.log(`conectado a la base de datos ` )
    } catch (error){
        console.log(`error ${error}`)
        return error
    }
}

