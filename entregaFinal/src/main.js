
import Server from './services/server.js';
import logger from "./logger/logger.js";
import {initMongoDB}  from './db/mongoDB/database.js'
import dotenv from 'dotenv'
import {initChat } from './services/chat.service.js'
import {server} from './services/server.js'


dotenv.config()

const PORT =process.env.PORT || 8080

const init = async () => {
    await initMongoDB();
    server.listen(PORT, ()=> console.log(`Servidor escuchando en puerto ${PORT} `))
    initChat()
    Server.on('error', (error) => logger.error(`Error en servidor ${PORT}`));
   
}

init()