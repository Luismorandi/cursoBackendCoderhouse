
import logger from "../logger/logger.js"
class Signup {

    
getSignup = async (req, res) => {

  return   res.render("signup")
  }

postSignup = async (req, res) => {
try{
  return res.render("login")
}catch(err){
  logger.error(`No pudimos hacer el registro ${err}`)
}
   
  }

  uploadImageSignup = async (req, res) => {
   console.log(res)

  }

}


export default Signup
