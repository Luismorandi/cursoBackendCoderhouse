
import dotenv from 'dotenv'
import {Server as WebSocketServer} from 'socket.io'
import { formatMessage } from '../../utils/messages.js';
import { userJoin, getCurrentUser, userLeave, getRoomUsers} from '../../utils/users.js';
import {server} from './server.js'
import {MessagesModel} from '../db/mongoDB/models/messages.js'
dotenv.config()


export const initChat = (req) => { 
const io = new  WebSocketServer(server)
const botName= 'Helpi'
 io.on('connection', (socket) =>{
    socket.on('joinRoom', () => {
    socket.emit('message', formatMessage(botName, 'Bienvenido al centro de ayuda. Por favor deja tu pregunta y en algun momento responderemos.'))

})
    socket.on('chatMessage', async msg=>{

       io.emit('message',formatMessage(`${req.user.username} `,msg))
       await MessagesModel.create({
        message: msg,
        userName: req.user.username,
        date: new Date(),
        userId: req.user._id
       })

  
    })

}) }