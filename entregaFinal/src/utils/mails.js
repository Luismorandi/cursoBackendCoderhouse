import dotenv from 'dotenv';
dotenv.config()

export class Mails {

    constructor(
        newUser,
        username,
        cart
    ){
        this.newUser = newUser;
        this.username = username;
        this.cart = cart;
    }

     mailNewUser= (newUser)=> {
        return {

            to:'luismorandit@gmail.com',
            subject: 'Nuevo usuario registrado',
            text: `El usuario el nombre ${newUser.name} ha sido registrado con el username ${newUser.username}.`
        }
    }

   mailCheckoutToAdmin = (username, cart)=>{

    return {

        
        to:'luismorandit@gmail.com',
        subject: 'Nueva compra',
        text: `El usuario  ${username}. ha realizado una compra con los siguientes articulos: 
        ${cart.products.map(product=>{return " " + product.title + " con precio " + product.value + "$"})}
        `
    }
      }
    
      mailCheckoutToUser = (username, cart) => {

        return {

            to:'luismorandit@gmail.com',
            subject: 'Nueva compra',
            text: `Gracias por tu compra ${username}. Has realizado una compra con los siguientes articulos: 
            ${cart.products.map(product=>{return " " + product.title + " con precio " + product.value + "$"})}
            `
        }
      }
  
      smsCheckoutToUser  = (username,cart) => {

        return {

            body: `El usuario  ${username}. ha realizado una compra con los siguientes articulos: 
            ${cart.products.map(product=>{return " " + product.title + " con precio " + product.value + "$"})}
            `,
            from: process.env.SMS,
            to: '1167232714'
        }
      }



}

