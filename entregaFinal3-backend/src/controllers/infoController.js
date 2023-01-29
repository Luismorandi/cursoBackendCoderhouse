
import logger from "../logger/logger.js";
export const  infoGet = (req, res) => {
    const datos = {
        argumentos_de_entrada: process.argv.slice(2),
        nombre_del_sist_operativo: process.env.OS,
        version_de_node_js: process.versions.node,
        memoria_total_reservada: process.memoryUsage().rss,
        path_de_ejecucion: process.execPath,
        process_id: process.pid,
        carpeta_del_proyecto: process.cwd(),
      };
      logger.info(`Petición  a ${req.url} con el método ${req.method}`);
    res.json(datos);
  };