import { Router } from 'express';
import Signup from '../controllers/signup.controllers.js';
import Auth from '../controllers/auth.controllers.js';


const signup = Router()
const authController = new Auth
const signupController = new Signup



signup.get('/', signupController.getSignup)
signup.post("/",authController.signupAuthenticate , signupController.postSignup);


export default signup
