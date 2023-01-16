import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/models.js'



const strategyOptions = {
usernameField: "username",
passwordField: "password",
passReqToCallback: true,
};


const signup =async (req, username, password, done) => {
	console.log("signUp", username, password)
	try{
		const newUser= await UserModel({username, password})
		console.log(newUser)
		newUser.password =await newUser.encryptPassword(password)
		console.log(newUser.password)
		await newUser.save()
		return done(null, newUser);	

}catch(err){
	console.log("Error creating user", err)
	return done(null, false);

}
}

const login = async (req, username, password, done) => {
	console.log('LOGIN!');
	const user = await UserModel.findOne({username});
	if (!user) return done(null, false);
	const match= await user.matchPassword(password);
	match ?  done(null, user) : done(null, false)
  };
  

  export const loginFunc = new LocalStrategy(strategyOptions, login);
  export const signUpFunc = new LocalStrategy(strategyOptions, signup);
  
  passport.serializeUser((user, done)=>{

	done(null, user._id);
  });
  
  passport.deserializeUser( async(userId, done)=>{

	const user = await UserModel.findById(userId);
	return done(null, user);
  });