
import Twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config()

const twilioClient = Twilio(process.env.TWILIO_ID, process.env.TWILIO_SK)

export const sendSms = async (message) => {
    try {

        const response = await twilioClient.messages.create(message)
        return {
            message: "OK",
            response: response
        }
    } catch (err) {
        console.error(err)
    }
}