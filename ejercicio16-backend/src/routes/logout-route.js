import { Router } from 'express';
import Logout from '../controllers/logout.controllers.js';



const logout = Router()
const logoutController= new Logout

logout.get('/',logoutController.getLogout)




export default logout
