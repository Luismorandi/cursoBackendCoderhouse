import express from 'express'
import mainRouter from './routes/user.routes.js'
import config from './config/index.js'
import {initDb}  from './services/db.js'


const app = express();



app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

initDb()




 app.use('/api', mainRouter)


 app.listen(config.PUERTO, () => console.log('listening on port ' + config.PUERTO));




