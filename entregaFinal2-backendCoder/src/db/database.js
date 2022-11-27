import mongoose from 'mongoose'

const connectionString = 'mongodb+srv://newiser:holahola@test-coderhouse.ovwadqn.mongodb.net/?retryWrites=true&w=majority'

export const initMongoDB = async () => {

    try{
       
        await mongoose.connect(connectionString)
        console.log(`conectado a la base de datos ${connectionString}` )
    } catch (error){
        console.log(`error ${error}`)
        return error
    }
}

