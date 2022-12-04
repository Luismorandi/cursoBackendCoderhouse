import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import {engine} from "express-handlebars";
import { mensaje_instancia } from "./src/controllers/messageControllers.js";
import { producto_instancia } from "./src/controllers/productsControllers.js";
import { normalize, denormalize, schema } from "normalizr";
import path from "path";
const __dirname = path.resolve();


const authorSchema = new schema.Entity("authors");
const textMessageSchema = new schema.Entity("texts");
const messageSchema = new schema.Entity("posts", {
  author: authorSchema,
  texts: textMessageSchema,
});

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
await producto_instancia.crearTabla();
const productos = await producto_instancia.listar();


const messagesDesnormalizer = await mensaje_instancia.listar();

let messages= normalize(messagesDesnormalizer,[messageSchema])

const handlebarsConfig = {
  defaultLayout: "index.html",
};

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine(handlebarsConfig));

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("HISTORIAL", productos);
  let messagesDenomalize = denormalize(messages.result, [messageSchema], messages.entities);
  console.log("MENSAJES DENORMALIZADOS:", messagesDenomalize);
  socket.emit("MENSAJES", messages);



  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.get("/productos-test", (req, res) => {
    res.sendFile(__dirname + "/public/index-testfaker.html");
  });

  app.post("/productos", (req, res) => {
    productos.push(req.body);
    producto_instancia.agregar([req.body]);
    io.sockets.emit("HISTORIAL", productos);
    console.log(productos);
    res.redirect("/");
  });

  app.post("/chat", (req, res) => {

    let req_format = {
      id: req.body.id,
      author: {
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        alias: req.body.alias,
        avatar: req.body.avatar,
      },
      text: { id: "mensajes", mensaje: req.body.contenido },
    };
    let req_normalize = normalize(req_formateado, messageSchema);
    console.log("MENSAJES NORMALIZADOS:", mensajes);

    let denormalizade = denormalize(req_normalize.result, messageSchema, req_normalize.entities);
    console.log("MENSAJES DENORMALIZADOS:", denormalizade);


    messagesDesnormalizer.push(req_format);
    mensaje_instancia.agregar(req_format, messageSchema);
    io.sockets.emit("MENSAJES", messages, [messageSchema], denormalizade);

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
