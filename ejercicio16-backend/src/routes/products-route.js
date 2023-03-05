import { Router } from "express";
import  Products from "../controllers/products.controller.js"

/* const filePath =  path.resolve(__dirname, '../../products.JSON'); */

const products = Router();
//trae todos los productos
products.get("/", getAllProducts);

//trae productos por su ID
products.get("/:id?", getProductById);

//incorpora productos al listado
products.post("/", checkAdmin, createProduct);

//actualiza un producto del listado
products.put("/:id", checkAdmin, updateProduct);

//Borra un producto del listado
products.delete("/:id", checkAdmin, deleteProduct);

export default products;
