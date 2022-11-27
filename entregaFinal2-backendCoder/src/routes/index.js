import { Router } from "express";
import Products from "./products.js";
import Cart from "./cart.js";

const mainRouter = Router();

mainRouter.use("/products", Products);
mainRouter.use("/carts", Cart);

export default mainRouter;
