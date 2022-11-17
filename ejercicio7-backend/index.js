import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import {engine} from "express-handlebars";
import { mensaje_instancia } from "./src/controllers/messageControllers.js";
import { producto_instancia } from "./src/controllers/productsControllers.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
await producto_instancia.crearTabla();
const productos = await producto_instancia.listar();
await mensaje_instancia.crearTabla();

const mensajes = await mensaje_instancia.listar();

const handlebarsConfig = {
  defaultLayout: "index.html",
};

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine(handlebarsConfig));

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("HISTORIAL", productos);
  socket.emit("MENSAJES", mensajes);



  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.post("/productos", (req, res) => {
    productos.push(req.body);
    producto_instancia.agregar([req.body]);
    io.sockets.emit("HISTORIAL", productos);
    console.log(productos);
    res.redirect("/");
  });

  app.post("/chat", (req, res) => {
    mensajes.push(req.body);
    mensaje_instancia.agregar(req.body);
    io.sockets.emit("MENSAJES", mensajes);
    console.log(mensajes);
    res.redirect("/");
  });

  app.get("/productos", (req, res) => {
    res.render("historial", { productos });
  });
});
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, function () {
  console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on("error", (error) => console.log(`Error en servidor ${error}`));
