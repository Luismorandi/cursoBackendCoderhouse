import parse from "yargs";
import Server from './services/server.js';
import logger from "./logger/logger.js";
import {initMongoDB}  from './db/database.js'

const yargs = parse(process.argv.slice(2));
const { port, _ } = yargs
  .alias({
    p: "puerto",
  })
  .default({
    port: 8080,
  }).argv;


const init = async () => {
    await initMongoDB();
    Server.listen(port, ()=> console.log(`Servidor online en ${port}`));
    Server.on('error', (error) => logger.error(`Error en servidor ${error}`));
}

init()