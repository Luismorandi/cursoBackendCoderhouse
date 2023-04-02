import { Router } from "express";

import Login from "./login.route.js";
import Home from "./home.route.js";
import Logout from "./logout.route.js";
import Signup from "./signup.route.js";
import Carts from "./carts.route.js"
import Products from "./products.route.js"
import Checkout from "./checkout.route.js"
import Chat from "./chat.route.js"


const mainRouter = Router();


mainRouter.use("/", Login);
mainRouter.use("/home", Home);
mainRouter.use("/logout", Logout);
mainRouter.use("/signup", Signup);
mainRouter.use("/carts", Carts);
mainRouter.use("/products", Products);
mainRouter.use("/checkout", Checkout);
mainRouter.use("/chat", Chat);



export default mainRouter;
