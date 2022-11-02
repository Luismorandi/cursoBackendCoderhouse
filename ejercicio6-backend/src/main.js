const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const {engine} = require("express-handlebars");

const app = express();
const server = http.Server(app)
const io = socketIo(server)

const productos = [];
const mensajes = [];

const handlebars = {
  defaultLayout: "index.html",
};

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine(handlebars));

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
    io.sockets.emit("HISTORIAL", productos);
    res.redirect("/");
  });

  app.post("/chat", (req, res) => {
    mensajes.push({ mensaje: req.body.mensaje, id: socket.id });
    io.sockets.emit("MENSAJES", mensajes);
    res.redirect("/");
  });

  app.get("/productos", (req, res) => {
    res.render("historial", { productos });
  });
});
const PORT = 8080;
const connectedServer = server.listen(PORT, function () {
  console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on("error", (error) => console.log(`Error en servidor ${error}`));
