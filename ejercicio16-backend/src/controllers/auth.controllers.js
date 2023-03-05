import passport from "passport"

class Auth {
   

    loginAutheticate = async (req,res, next) => {
        const authFunc = passport.authenticate('local-login', {
            successRedirect: '/home',
            failureRedirect: '/login',
            passReqToCallback: true
          })

          authFunc(req, res, next);
    }

    signupAuthenticate = async (req,res, next) => {
        const authFunc = passport.authenticate('local-signup', {
                successRedirect: '/home',
                failureRedirect: '/login',
                passReqToCallback: true
            
          })

          authFunc(req, res, next);
    }

}
export default Auth