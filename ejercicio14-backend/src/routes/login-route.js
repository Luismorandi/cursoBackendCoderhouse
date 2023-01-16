import { Router } from 'express';
import passport from "passport";
import routesFunctions from '../controllers/loginControllers.js'
import session from 'express-session';
import config from "../config/config.js";
import path from "path";
import MongoStore from "connect-mongo";
import logger from '../logger/logger.js';
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const __dirname = path.resolve();


const login = Router()
login.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.URL_BASE_DE_DATOS,
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
login.use(passport.initialize())
login.use(passport.session())
  // -------------------------SINGUP-------------------------------------/
 login.get("/signup", routesFunctions.getSignup);
 login.post("/signup", passport.authenticate("signup", { failureRedirect: "/api/login/failsignup" }), routesFunctions.postSignup);
 login.get("/failsignup", routesFunctions.getFailSignup);
login.get("/error_registro", (req, res) => {
    res.sendFile(__dirname + "/public/error_registro.html");
  });
 


 // -------------------------LOGIN-------------------------------------/
 login.get("/login", routesFunctions.getLogin);
  login.post("/login", passport.authenticate("login", { failureRedirect: "apu/login/faillogin" }), routesFunctions.postLogin);
 login.get("/faillogin", routesFunctions.getFaillogin);
  login.get("/error_login", (req, res) => {
    logger.info(`Petición a ${req.url} con el método ${req.method}`);
    res.sendFile(__dirname + "/public/error_login.html");
  });
  login.get("/index_logueado", (req, res) => {
    logger.info(`Petición a ${req.url} con el método ${req.method}`);

    if (!req.user.username) {
      res.json({ message: "Error al loguear, CREDENCIALES NO VÁLIDAS" });
    } else {
      res.sendFile(__dirname + "/public/index.html");
    }
  });

  export default login