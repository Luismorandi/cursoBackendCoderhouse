import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/models.js'

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
			avatar = "hola" } = req.body
		try {
			const user = await UserModel.find({ username: username })
			if (user.length === 0) {

				const newUser = await UserModel({ username, password, name, adress, age, cellphoneNumber, avatar })

				newUser.password = await newUser.encryptPassword(password)
				console.log(newUser.password)
				await newUser.save()
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