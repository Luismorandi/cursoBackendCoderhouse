import dotenv from 'dotenv';


dotenv.config();


export default {

    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV,
    PUERTO: process.env.PUERTO,
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY
}