import express from "express";
import session from "express-session";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoDBconfig from "./config/mongoDBconfig.js";
import conectarDB from "./controllers/mongoDBcontrollers.js";
import routesFunctions from "./routesFunctions.js";
import {UserModel} from "./models.js";
// LocalStrategy = LocalStrategy.Strategy;
import { Server as HttpServer } from "http";
import exphbs from "express-handlebars";
import { loginFunc, signUpFunc } from './services/auth.js'

import MongoStore from "connect-mongo";
import path from "path";
const __dirname = path.resolve();
//-----------------CONEXIÓN MONGO -------------------------------------/
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
//---------------------------------------------------------------------/
const app = express();

const httpServer = new HttpServer(app);
const strategyOptions = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
  };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const handlebarsConfig = {
  defaultLayout: "index.html",
};
app.engine("handlebars", exphbs(handlebarsConfig));



app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoDBconfig.URL_BASE_DE_DATOS,
      mongoOptions: advancedOptions,
    }),
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());



  passport.use('login', loginFunc)
  passport.use('signup', signUpFunc)
 


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, done);
});



//----------------------------------------------------------------/

app.use(express.static("public"));




  app.get("/index_logueado", (req, res) => {


    if (!req.user.username) {

      res.json({ message: "Error al loguear, CREDENCIALES NO VÁLIDAS" });
    } else {
      res.sendFile(__dirname + "/public/index.html");
      
    }
  });

  // -------------------------SINGUP-------------------------------------/
  app.get("/signup", routesFunctions.getSignup);
  app.post("/signup", passport.authenticate("signup", { failureRedirect: "/failsignup" }), routesFunctions.postSignup);
  app.get("/failsignup", routesFunctions.getFailSignup);
  app.get("/error_registro", (req, res) => {
    res.sendFile(__dirname + "/public/error_registro.html");
  });
  // -------------------------LOGIN-------------------------------------/

  app.get("/login", routesFunctions.getLogin);
  app.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), routesFunctions.postLogin);
  app.get("/faillogin", routesFunctions.getFaillogin);
  app.get("/error_login", (req, res) => {
    res.sendFile(__dirname + "/public/error_login.html");
  });
  function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      req.session.username = req.body.username;

      next();
    } else {
      res.redirect("/login");
    }
  }

  app.get("/ruta-protegida", checkAuthentication, (req, res) => {
    const { user } = req;
    console.log(user);
    res.send("<h1>Ruta OK!</h1>");
  });

  // -------------------------LOGOUT-------------------------------------/
  app.get("/logout", routesFunctions.getLogout);

  // ------------------------- FAIL ROUTE-----------------------------------------------/
  app.get("*", routesFunctions.failRoute);




  app.use(express.static("public"));

conectarDB(mongoDBconfig.URL_BASE_DE_DATOS, (err) => {
  if (err) return console.log("error en conexión de base de datos", err);
  console.log("BASE DE DATOS CONECTADA");
  const PORT = 8080;
  const connectedServer = httpServer.listen(PORT, function () {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`);
  });
  connectedServer.on("error", (error) => console.log(`Error en servidor ${error}`));
});
