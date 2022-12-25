import { Router } from "express";
import { fork } from "child_process";
import path from "path";

const random = Router();

random.get("/", (req, res) => {
    const computo = fork(path.resolve(process.cwd(), "src/controllers/randomControllers.js"));
    let cantidad = req.query.cant || 100000000;
    computo.on("message", (resultado) => {
      if (resultado === "listo") {
        computo.send(cantidad);
      } else {
        res.json(resultado);
      }
    });
  });


export default random;
