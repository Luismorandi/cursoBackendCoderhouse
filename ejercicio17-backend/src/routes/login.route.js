import { Router } from 'express';
import Login from '../controllers/login.controllers.js'
import Auth from '../controllers/auth.controllers.js'
import { authMiddl } from '../services/auth.service.js';


const login = Router()
const LoginController = new Login
const AuthController = new Auth


login.get('/', LoginController.getLogin)

login.post('/', AuthController.loginAutheticate, LoginController.postLogin)


export default login;
