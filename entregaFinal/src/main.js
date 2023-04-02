
import Server from './services/server.services.js';
import logger from "./logger/logger.js";
import {initMongoDB}  from './db/mongoDB/database.js'
import dotenv from 'dotenv'

import {server} from './services/server.services.js'


dotenv.config()

const PORT =process.env.PORT || 8080

const init = async () => {
    await initMongoDB();
    server.listen(PORT, ()=> console.log(`Servidor escuchando en puerto ${PORT} `))

    Server.on('error', (error) => logger.error(`Error en servidor ${PORT}`));
   
}

init()