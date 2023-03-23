

class Logout {


  getLogout = async (req, res) => {
    req.logOut();
    res.redirect('/')
  }


}


export default Logout
