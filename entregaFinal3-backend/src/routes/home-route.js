import { Router } from "express";
import { authMiddl } from "../services/auth.js";
import  Home from "../controllers/home.controller.js"

const home = Router();
const homeController = new Home


home.get('/', authMiddl, homeController.getHome)

export default home