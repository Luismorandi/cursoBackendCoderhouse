import express from 'express'
import mainRouter from '../routes/index.js'
import passport from "passport";

import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import config from "../config/config.js";
import {UserModel} from "../models/models.js";
// LocalStrategy = LocalStrategy.Strategy;

import exphbs from "express-handlebars";
import { loginFunc, signUpFunc } from './auth.js'

import MongoStore from "connect-mongo";
import Compression from 'compression'
import compression from 'compression';


const app = express();
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', mainRouter)
app.use(express.urlencoded({ extended: true }));
const handlebarsConfig = {
  defaultLayout: "index.html",
};
app.engine("handlebars", exphbs(handlebarsConfig));
app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.URL_BASE_DE_DATOS,
        mongoOptions: advancedOptions,
      }),
      secret: "keyboard cat",
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 10000,
      },
      rolling: true,
      resave: true,
      saveUninitialized: false,
    })
  );

app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

passport.use('login', loginFunc)
passport.use('signup', signUpFunc)



passport.serializeUser((user, done) => {
done(null, user._id);
});

passport.deserializeUser((id, done) => {
UserModel.findById(id, done);
});





export default app