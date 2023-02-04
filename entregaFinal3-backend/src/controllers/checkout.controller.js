
import { CartsModel } from "../models/carts.js"
import { sendMail } from "../services/nodemailer.js"
import { sendSms } from "../services/twilio.js"
import { Mails } from "../utils/mails.js"



class Checkout {

  buyCartActive = async (req, res) => {

    try {

      const userId = req.user._id.toString()
      const username = req.user.username
      const cart = await CartsModel.findOne({ userOwner: userId, isActive: true })
      await CartsModel.updateOne({ userOwner: userId, isActive: true }, { $set: { isActive: false } })
      const mails = new Mails(userId, username, cart)
      const mailCheckoutToAdmin = mails.mailCheckoutToAdmin(username, cart)
      const mailCheckoutToUser = mails.mailCheckoutToUser(username, cart)
      const sms = mails.smsCheckoutToUser(username, cart)


      await sendMail(mailCheckoutToAdmin)
      await sendMail(mailCheckoutToUser)
      await sendSms(sms)
      return res.render("home")
    } catch (err) {
      res.status(500).json({
        error: 'hoala,',
      });

    }
  }
}
export default Checkout