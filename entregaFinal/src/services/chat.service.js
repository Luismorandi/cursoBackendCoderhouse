
import dotenv from 'dotenv'
import {Server as WebSocketServer} from 'socket.io'
import { formatMessage } from '../../utils/messages.js';
import { userJoin, getCurrentUser, userLeave, getRoomUsers} from '../../utils/users.js';
import {server} from './server.js'
dotenv.config()

const botName= 'boti'
 export const initChat = () => { 
const io = new  WebSocketServer(server)
io.on('connection', (socket) =>{
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id,username, room)
socket.join(user.room)
    
    socket.emit('message', formatMessage(botName, 'Welcome to chat'))
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))
    io.to(user.room).emit('roomUsers', {
        room: user.room,
        users:getRoomUsers(user.room)
    })
})
    socket.on('chatMessage', msg=>{
        const user = getCurrentUser(socket.id)
       io.to(user.room).emit('message',formatMessage(user.username,msg))
    })

    socket.on('disconnect', ()=> {
        const user = userLeave(socket.id)
        console.log(user)

        if(user){
            io.to(user.room).emit('message',formatMessage(botName, `${user.username} has left the chat`))

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
}) }