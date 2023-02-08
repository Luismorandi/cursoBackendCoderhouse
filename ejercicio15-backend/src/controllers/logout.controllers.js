

class Logout {


  getLogout = async (req, res) => {
    req.logOut();
    res.redirect('/login')
  }


}


export default Logout
