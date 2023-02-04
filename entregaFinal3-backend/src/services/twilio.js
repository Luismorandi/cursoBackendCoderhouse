
import Twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config()

const twilioClient = Twilio(process.env.TWILIO_ID, process.env.TWILIO_SK)
/* export const sendWhatapp = async () => {

   await  client.messages
    .create({
        from: 'whatsapp: +14155238886',
        body: 'Your appointment is coming up on July 21 at 3PM',
        to: 'whatsapp:+5491167232714'
    })
    .then(message => console.log(message.sid));
} */

export const sendSms = async (message) => {
    try{

        const response = await twilioClient.messages.create(message)
        return {
            message: "OK",
            response: response
        }
    }catch(err){
        console.error(err)
    }
}