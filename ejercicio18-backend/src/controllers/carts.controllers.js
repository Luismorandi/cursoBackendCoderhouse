import { CartsModel } from "../db/mongoDB/models/carts.js";
import { getProductById } from "../services/products.services.js";
import { getAllCarts, getCartById, getCartActive, getCartsByUserId } from "../services/carts.services.js";

class Carts {
  constructor(products, userOwner, isActive) {
    this.products = products;
    this.userOwner = userOwner
    this.isActive = isActive;
  }


  getAllCarts = async (req, res) => {
    try {
      const carts = await getAllCarts()
      res.json({
        data: carts,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };


  getCartActive = async (req, res) => {
    try {
      const userId = req.user._id.toString();
      const cartActive = await getCartActive(userId, true)


      res.json(cartActive);
    } catch (err) {
      res.status(500).json({
        error: 'hoala,',
      });
    }
  };

  addNewProduct = async (req, res) => {
    try {
      const userId = req.user._id.toString()
      const carts = await getCartsByUserId(userId)
      const productId = req.params.productId;
      const cartActive = carts.filter((cart) => cart.isActive === true)
      if (cartActive.length === 0) {
        await CartsModel.create({
          products: [],
          userOwner: userId,
          isActive: true

        });
      }

      const cartActive2 = await getCartActive(userId, true)
      console.log(cartActive2)
      const cartActiveId = cartActive2[0]._id.toString()
      console.log(cartActiveId)
      const cart = await getCartById(cartActiveId);

      if (!cart) {
        return res.status(404).json({
          msg: `El carrito  con id  no existe`,
        });
      }

      const newProduct = await getProductById(productId)

      const productsOfCart = cart.products
      productsOfCart.push(newProduct);
      const cartUpdate = await CartsModel.findByIdAndUpdate(
        cartActiveId,
        { _id: cart._id, products: productsOfCart },
        { new: true }
      );

      res.render('home')
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };

  deleteProductOfCart = async (req, res) => {
    try {
      const numberId = req.params.id;
      const idProduct = req.params.id_prod;
      const cart = await getCartById(numberId)
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

  deleteCart = async (req, res) => {
    try {
      const numberId = req.params.id;
      const cart = await getCartById(numberId);
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
}



export default Carts
