import { UserModel } from "../models/models.js"
import { CartsModel } from "../models/carts.js"

class Checkout {

    buyCartActive =async (req, res) => {

        try {
        const userId = req.user._id.toString()

    await CartsModel.updateOne({userOwner:userId, isActive:true},{ $set: {isActive: false}})
        
        
    return   res.render("home")
      } catch (err) {
        res.status(500).json({
          error: 'hoala,',
        });
        
        }
}}
export default Checkout