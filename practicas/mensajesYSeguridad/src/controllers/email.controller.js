import sgMail from "../services/email.service.js";
import { templateHtml } from '../services/templates.js';

export const sendEmailEthereal = async (req, res) => {
    const {dest} =req.body
    const mailOptions = {
        from: process.env.EMAIL,
        to: dest,
        subject: "Hola buenas",
        html: templateHtml,
        mail_settings:{
            sandbox_mode:{
                enable:true
             }
        }
       
    }
    
    try{
        const response = await sgMail.send(mailOptions)
        console.log('mail enviado')
        res.json(response)

    }catch(err){
        console.log(err);
     }

       }