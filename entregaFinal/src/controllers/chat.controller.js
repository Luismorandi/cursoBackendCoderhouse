import { request } from 'http';
import path from 'path'
import { fileURLToPath } from 'url';
import {MessagesModel} from '../db/mongoDB/models/messages.js'
import {initChat } from '../services/chat.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Chat {


    goToChat = async (req, res) => {
        initChat(req)
        return res.render("chat")
    }

    getMessagesByEmail = async (req, res) => {
       const messages = await MessagesModel.find({userName: req.params.email})
        return res.send(messages)
    }
}
export default Chat