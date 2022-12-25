import { Router } from 'express';
import passport from "passport";
import routesFunctions from '../controllers/loginControllers.js'
import session from 'express-session';
import config from "../config/config.js";
import path from "path";
import MongoStore from "connect-mongo";
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
    res.sendFile(__dirname + "/public/error_login.html");
  });
  login.get("/index_logueado", (req, res) => {
    console.log(req.user)

    if (!req.user.username) {
      res.json({ message: "Error al loguear, CREDENCIALES NO VÁLIDAS" });
    } else {
      res.sendFile(__dirname + "/public/index.html");
    }
  });
/*   function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      req.session.username = req.body.username;
      console.log("username en autenticación", req.session.username);
      next();
    } else {
      res.redirect("/login");
    }
  } */
/* 
  app.get("/ruta-protegida", checkAuthentication, (req, res) => {
    const { user } = req;
    console.log(user);
    res.send("<h1>Ruta OK!</h1>");
  });
 */
  // -------------------------LOGOUT-------------------------------------/
/*   app.get("/logout", routesFunctions.getLogout);
 */
  export default login