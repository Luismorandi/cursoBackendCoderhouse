import express from 'express'
import mainRouter from '../routes/index.js'
import passport from "passport";
import dotenv from 'dotenv'
import session from 'express-session';
import auth from './auth.service.js'
import path from 'path'
import { fileURLToPath } from 'url';
import multer from 'multer'
import {graphqlHTTP} from 'express-graphql'
import { graphqlRoot, graphqlSchema } from './graphql.services.js';
import http from 'http'

dotenv.config()
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
auth()
const app = express();
export const server = http.createServer(app)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'mysecretSession',
  resave: false,
  saveUninitialized: false

}))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
const storage = multer.diskStorage({
  destination: 'public/assests',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
app.use(multer({
  storage,
  dest: 'public/assests'
}).single('image'))


app.use('/graphql', graphqlHTTP({
  schema:  graphqlSchema,
  rootValue: graphqlRoot,
  graphiql: true

}))
app.use('/', mainRouter)
app.use(express.urlencoded({ extended: true }));



export default app