import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';


dotenv.config()

sgMail.setApiKey(process.env.API_KEY_SENDGRID)

export default sgMail;