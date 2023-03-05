
class Products {

    
    getLogout = async (req, res) => {
      req.logOut();
      res.redirect('/login')
      }
    
    
    }
    
    
    export default Products