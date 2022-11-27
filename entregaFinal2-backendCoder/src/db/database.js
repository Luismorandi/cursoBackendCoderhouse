import mongoose from 'mongoose'

const connectionString = 'mongodb://localhost:27017/ecommerce'

export const initMongoDB = async () => {

    try{
       
        await mongoose.connect(connectionString)
        console.log(`conectado a la base de datos ${connectionString}` )
    } catch (error){
        console.log(`error ${error}`)
        return error
    }
}

