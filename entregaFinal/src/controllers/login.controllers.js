

class Login {


  getLogin = async (req, res) => {
    if(req.session?.passport?.user){
      return res.render("home")
    }
    return res.render("login")
  }

  postLogin = async (req, res) => {
    return res.render("home")
  }

}


export default Login
