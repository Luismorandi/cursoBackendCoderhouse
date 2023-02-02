import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import Carts from "../controllers/carts.controllers.js";
import { CartsModel } from "../models/carts.js";
import { UserModel } from '../models/models.js'
import { sendMail } from "./nodemailer.js";



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
			avatar = "hola",
		carts= [] } = req.body
		try {
			const user = await UserModel.find({ username: username })
			if (user.length === 0) {

				const newUser = await UserModel({ username, password, name, adress, age, cellphoneNumber, avatar, carts })

				newUser.password = await newUser.encryptPassword(password)
			const mailOptions={
				to:'luismorandit@gmail.com',
				subject: 'Nuevo usuario registrado',
				text: `El usuario con datos nombre ${newUser.name} ha sido registrado con el username ${newUser.username}.`
			}
				await newUser.save()
				await sendMail(mailOptions)
				return done(null, newUser);
			} else {
				console.log('Ya estas registrado')
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
		const products= [];
	
		if(carts.length === 0 || !cartsActive ) {
			user.carts =  await CartsModel.create({
				products,
				userOwner: user._id,
				isActive: true

			  });

			  
			await  user.save()
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
    res.redirect('/login')

}


export default initAuth