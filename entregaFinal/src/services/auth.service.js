import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import Carts from "../controllers/carts.controllers.js";
import { CartsModel } from "../db/mongoDB/models/carts.js";
import { UserModel } from '../db/mongoDB/models/models.js'
import { sendMail } from "./nodemailer.service.js";

import { Mails } from "../utils/mails.js";




const initAuth = () => {
	passport.serializeUser((user, done) => {

		done(null, user.id);
	});

	passport.deserializeUser(async (userId, done) => {

		const user = await UserModel.findById(userId);
		return done(null, user);
	});
	const signup = async (req, username, password, done) => {
		const { name,
			adress,
			age,
			cellphoneNumber,
			avatar = req.file?.originalname,
			carts = [], 
			repeatPassword  } = req.body

			
		try {
			
			const user = await UserModel.find({ username: username })
			if (user.length === 0 && repeatPassword === password) {
				const newUser = await UserModel({ username, password, name, adress, age, cellphoneNumber, avatar, carts })
				newUser.password = await newUser.encryptPassword(password)
				const mail = new Mails(newUser)
				await newUser.save()
				await sendMail(mail.mailNewUser(newUser, name, carts))
				return done(null, newUser);
			} else if( repeatPassword !== password){
				return done("Las constraseñas ingresadas tienen que ser iguales")
			} else{
				return done("Ya estas registrado")
			}

		} catch (err) {
			console.log("Error creating user", err)
			return done(null, false);

		}
	}


	const login = async (req, username, password, done) => {


		const user = await UserModel.findOne({ username });
		if (!user) return done(null, false);
		const match = await user.matchPassword(password);
		match ? done(null, user) : done(null, false)

		const carts = user.carts
		const cartsActive = carts.filter((cart) => cart.isActive === true)
		const products = [];

		if (carts.length === 0 || !cartsActive) {
			user.carts = await CartsModel.create({
				products,
				userOwner: user._id,
				isActive: true

			});


			await user.save()
		}



	};
	const strategyOptions = {
		usernameField: "username",
		passwordField: "password",
		passReqToCallback: true,
	};

	passport.use('local-signup', new LocalStrategy(strategyOptions, signup));
	passport.use('local-login', new LocalStrategy(strategyOptions, login))
}


export const authMiddl = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/')

}


export default initAuth