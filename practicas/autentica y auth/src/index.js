import express from 'express'
import mainRouter from './routes/user.routes.js'
import session from 'express-session'
import passport from 'passport'
import { loginFunc, signUpFunc } from './services/auth.js'
import MongoStore from 'connect-mongo'
import config from './config/index.js'
import {initDb}  from './db/db.js'


const app = express();



app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

initDb()
const ttlSeconds= 180;

const StoreOptions = {
    store: MongoStore.create({

        mongoUrl: config.MONGO_ATLAS_URL
        
    }
        ),
    secret: 'secretString',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: ttlSeconds * 1000
    }    
 }
 app.use(session(StoreOptions ))
 app.use(passport.initialize());
app.use(passport.session());

 passport.use('login', loginFunc)
 passport.use('signup', signUpFunc)




 app.use('/api', mainRouter)


 app.listen(config.PUERTO, () => console.log('listening on port ' + config.PUERTO));




