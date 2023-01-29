import { Router } from "express";
import { sendEmailEthereal } from "../controllers/email.controller.js";



const emailRoute= Router()

emailRoute.post('/send', sendEmailEthereal)

export default emailRoute;