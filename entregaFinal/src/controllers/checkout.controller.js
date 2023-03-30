
import { CartsModel } from "../db/mongoDB/models/carts.js"
import { OrdersModel } from "../db/mongoDB/models/orders.js"
import { sendMail } from "../services/nodemailer.service.js"
import { sendSms } from "../services/twilio.service.js"
import { Mails } from "../utils/mails.js"
import { getCartActive } from "../services/carts.services.js"



class Checkout {

  buyCartActive = async (req, res) => {

    try {

      const userId = req.user._id.toString()
      const username = req.user.username
      const cart = await getCartActive(userId, true)

      await CartsModel.updateOne({ userOwner: userId, isActive: true }, { $set: { isActive: false } })
      const mails = new Mails(userId, username, cart)
      const mailCheckoutToAdmin = mails.mailCheckoutToAdmin(username, cart[0])
      const mailCheckoutToUser = mails.mailCheckoutToUser(username, cart[0])
      const orderNumber = (await OrdersModel.find()).length

      console.log(req.user.adress )
    
      
        await OrdersModel.create({
          products: cart[0].products,
          userOwner: userId,
          email: username,
          date: new Date(),
          adress: req.user.adress,
          orderNumber: `${orderNumber}-${userId}`,
          status: "Generada"

        });
      

      await sendMail(mailCheckoutToAdmin)
      await sendMail(mailCheckoutToUser)
      return res.render("home")
    } catch (err) {
      res.status(500).json({
        error: 'hoala,',
      });

    }
  }
}
export default Checkout