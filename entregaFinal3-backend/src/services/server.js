import express from 'express'
import mainRouter from '../routes/index.js'
import passport from "passport";
import dotenv from 'dotenv'
import session from 'express-session';
import auth from './auth.js'
import path from 'path'
import { fileURLToPath } from 'url';
dotenv.config()
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
auth()
const app = express();

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'mysecretSession',
  resave: false,
  saveUninitialized:false

}))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.use('/', mainRouter)
app.use(express.urlencoded({ extended: true }));



export default app