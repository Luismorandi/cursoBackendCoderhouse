import { Router } from "express";
import Info from "./info.route.js";
import Login from "./login.route.js";
import Home from "./home.route.js";
import Logout from "./logout.route.js";
import Signup from "./signup.route.js";
import Carts from "./carts.route.js"
import Products from "./products.route.js"
import Checkout from "./checkout.route.js"



const mainRouter = Router();

mainRouter.use("/info", Info);

mainRouter.use("/login", Login);
mainRouter.use("/home", Home);
mainRouter.use("/logout", Logout);
mainRouter.use("/signup", Signup);
mainRouter.use("/carts", Carts);
mainRouter.use("/products", Products);
mainRouter.use("/checkout", Checkout);


export default mainRouter;
