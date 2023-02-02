import { Router } from "express";
import { authMiddl } from "../services/auth.js";
import  Carts from "../controllers/carts.controllers.js"

const carts = Router();
const cartsController = new Carts

//Permite listar todos los pcarritos existentes en la db
carts.get("/cart-active",authMiddl, cartsController.getCartActive);


//permite crear un carrito y devuelve su id
carts.post("/",authMiddl, cartsController.createCart);

//Incorpora productos al carritos por su id de producto
carts.get("/:productId", authMiddl,cartsController.addNewProduct);

//Vacia un carrito y lo elimina.
carts.delete("/:id",authMiddl, cartsController.deleteCart);

//elimina un producto de un carrito especifico
carts.put("/:id/products/:id_prod",authMiddl, cartsController.deleteProductOfCart);

//carrito activo del usuario
carts.get("/user",authMiddl, cartsController.getAllCarts);

export default carts;
