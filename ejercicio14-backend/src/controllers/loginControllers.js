import path from "path";
import logger from "../logger/logger.js";
const __dirname = path.resolve();

// PARA LA RUTA RAÍZ, NO HACE NADA
function getRoot(req, res) {}

// REGISTRO
function getSignup(req, res) {
  res.sendFile(__dirname + "/public/register.html");
}

function postSignup(req, res) {
  let user = req.user;
  logger.info(`Petición a ${req.url} con el método ${req.method}`);
  res.redirect("login");
}

function getFailSignup(req, res) {
  logger.warn(`Petición hecha a ruta inexistente: ${req.url}, con el método ${req.method}`);
  res.redirect("/api/login/error_registro");
  
}

// LOGIN
function getLogin(req, res) {
  logger.info(`Petición a ${req.url} con el método ${req.method}`);
  if (req.isAuthenticated() && req.session.username) {
    const user = req.user;
    console.log("Usuario logueado", user);
    res.redirect("/api/login/index_logueado");
  } else {
    console.log("Usuario NO logueado");
    res.sendFile(__dirname + "/public/login.html");
  }
}

function postLogin(req, res) {
  logger.info(`Petición a ${req.url} con el método ${req.method}`);
  const user = req.user;
  req.session.username = user.username;


  res.redirect("/api/login/index_logueado");
  // res.sendFile(__dirname + "/views/index.html");
}

function getFaillogin(req, res) {
  logger.info(`Petición a ${req.url} con el método ${req.method}`);
  res.redirect("/api/login/error_login");

  // res.json({ error: "CREDENCIALES NO VALIDAS << Revise su usuario y password >>" });
}

function getLogout(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/login");
}

function failRoute(req, res) {
  res.status(404).json({ error: "RUTA INVALIDA" });
}

export default { getRoot, getSignup, getLogin, postSignup, getFailSignup, postLogin, getFaillogin, getLogout, failRoute };
