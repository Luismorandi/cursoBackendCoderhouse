import { CartsModel } from "../models/carts.js";
import { Router } from "express";


const carts = Router();
//trae todos los productos
export const getAllCarts = async (req, res) => {
  try {
    const carts = await CartsModel.find();
    res.json({
      data: carts,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getCartById = async (req, res) => {
  try {
    const id = req.params.id;
    const carts = await CartsModel.find();

    if (id) {
      const index = carts.findIndex((obj) => obj.id == id);
      const cart = carts[index];

      if (index < 0) {
        return res.status(404).json({
          msg: `el producto con ${id} no existe`,
        });
      } else {
        res.json({
          data: cart.products,
        });
      }
    }
  } catch {
    res.status(500).json({
      error: err.message,
    });
  }
};
//permite crear un carrito y devuelve su id
export const createCart = async (req, res) => {
  try {
    const { products } = req.body;
    if (!products) {
      return res.status(400).json({
        error: "Falta agregar ños productos",
      });
    }
    const newProduct = await CartsModel.create({
      products,
    });
    res.json({
      msg: "Agregado el nuevo carrito",
      data: newProduct._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
//acgrega un producto a un carrito del listado
export const addNewProduct = async (req, res) => {
  try {
    const numberId = req.params.id;

    const cart = await CartsModel.findById(numberId);
    if (!cart) {
      return res.status(404).json({
        msg: `El carrito  con id ${id} no existe`,
      });
    }

    const productsOfCart = cart.products;

    const { title, value, thumbnail, stock, categoryId } = req.body;

    if (!title || !value || !thumbnail || !stock || !categoryId) {
      return res.status(400).json({
        error: "Falta un dato del producto",
      });
    }

    const newProduct = {
      title,
      value,
      thumbnail,
      stock,
	  categoryId
    };

    productsOfCart.push(newProduct);

    const cartUpdate = await CartsModel.findByIdAndUpdate(
      numberId,
      { _id: cart._id, products: productsOfCart },
      { new: true }
    );

    res.json({
      msg: `Carrito actualizado con id ${numberId}`,
      data: cartUpdate,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

//Borra un producto del listado
export const deleteProductOfCart = async (req, res) => {
  try {
    const numberId = req.params.id;
    const idProduct = req.params.id_prod;
    const cart = await CartsModel.findById(numberId);
    if (!cart) {
      return res.status(404).json({
        msg: `El carrito con ${numberId} no existe`,
      });
    }
    const productsOfCart = cart.products;
    const indexProduct = productsOfCart.findIndex((obj) => obj.id == idProduct);
    productsOfCart.splice(indexProduct, 1);

    await CartsModel.findByIdAndUpdate(
      numberId,
      { _id: cart._id, products: productsOfCart },
      { new: true }
    );
    res.json({
      msg: `Producto elminado con id ${idProduct} del carrito con id ${numberId}`,
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const numberId = req.params.id;
    const cart = await CartsModel.findById(numberId);
    if (!cart) {
      return res.status(404).json({
        msg: `El carrito con ${numberId} no existe`,
      });
    }

    await CartsModel.findByIdAndDelete(numberId);
    res.json({
      msg: `Carrito eliminado con id ${numberId}`,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export default carts;
