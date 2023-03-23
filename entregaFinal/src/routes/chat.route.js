import { Router } from "express";
import { authMiddl } from "../services/auth.service.js";
import Chat from "../controllers/chat.controller.js";

const chat = Router();
const chatController = new Chat


chat.get('/', authMiddl, chatController.goToChat)

export default chat