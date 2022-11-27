import { Router } from "express";
import {
  createCart,
  getAllCarts,
  getCartById,
  addNewProduct,
  deleteProductOfCart,
  deleteCart,
} from "../controllers/carts.js";

const cart = Router();

//Permite listar todos los pcarritos existentes en la db
cart.get("/", getAllCarts);

//permite listar los productos de un carrito especifico
cart.get("/:id?/products", getCartById);

//permite crear un carrito y devuelve su id
cart.post("/", createCart);

//Incorpora productos al carritos por su id de producto
cart.post("/:id/updateCart", addNewProduct);

//Vacia un carrito y lo elimina.
cart.delete("/:id", deleteCart);

//elimina un producto de un carrito especifico
cart.put("/:id/products/:id_prod", deleteProductOfCart);

export default cart;
