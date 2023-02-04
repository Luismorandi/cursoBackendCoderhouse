import { UserModel } from "../models/models.js"
import { CartsModel } from "../models/carts.js"
import { sendMail } from "../services/nodemailer.js"
import {sendSms} from "../services/twilio.js"



class Checkout {


  

    buyCartActive =async (req, res) => {


  
        try {
        const userId = req.user._id.toString()
const cart = await CartsModel.findOne({userOwner:userId, isActive:true})
    await CartsModel.updateOne({userOwner:userId, isActive:true},{ $set: {isActive: false}})
   
    const mailCheckoutToAdmin ={

      to:'luismorandit@gmail.com',
      subject: 'Nueva compra',
      text: `El usuario  ${req.user.username}. ha realizado una compra con los siguientes articulos: 
      ${cart.products.map(product=>{return " " + product.title + " con precio " + product.value + "$"})}
      `
    }

    const mailCheckoutToUser ={

      to:'luismorandit@gmail.com',
      subject: 'Nueva compra',
      text: `Gracias por tu compra ${req.user.name}. Has realizado una compra con los siguientes articulos: 
      ${cart.products.map(product=>{return " " + product.title + " con precio " + product.value + "$"})}
      `
    }

    const sms = {
      body: `El usuario  ${req.user.username}. ha realizado una compra con los siguientes articulos: 
      ${cart.products.map(product=>{return " " + product.title + " con precio " + product.value + "$"})}
      `,
      from: process.env.SMS,
      to: req.user.cellphoneNumber
    }
 
    await sendMail(mailCheckoutToAdmin)
    await sendMail(mailCheckoutToUser)
    await sendSms(sms)
    return   res.render("home")
      } catch (err) {
        res.status(500).json({
          error: 'hoala,',
        });
        
        }
}}
export default Checkout