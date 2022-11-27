import Server from './services/server.js';
import {initMongoDB}  from './db/database.js'



const init = async () => {
    await initMongoDB();
    const PORT = 8080;
    Server.listen(PORT, ()=> console.log("Servidor online"));
}

init()