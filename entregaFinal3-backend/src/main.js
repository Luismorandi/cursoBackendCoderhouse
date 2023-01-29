
import Server from './services/server.js';
import logger from "./logger/logger.js";
import {initMongoDB}  from './db/database.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT =process.env.PORT || 8080
const init = async () => {
    await initMongoDB();
    Server.listen(PORT, ()=> console.log(`Servidor online en ${PORT}`));
    Server.on('error', (error) => logger.error(`Error en servidor ${PORT}`));
}

init()