import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'luismorandit@gmail.com', // generated ethereal user
      pass: 'reapcajahqseplnr', // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  transporter.verify().then(()=>console.log('Ready to send email'));


  export const sendMail = async(mailOptions) => {

 await transporter.sendMail({
    from: '"Admin" <luismorandit@gmail.com>', // sender address
    to: `${mailOptions.to}`, // list of receivers
    subject: `${mailOptions.subject}`, // Subject line
    text: `${mailOptions.text}`, // plain text body
  })}


