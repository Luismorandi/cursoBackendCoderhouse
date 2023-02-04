import { CartsModel } from "../models/carts.js";
import { UserModel } from "../models/models.js";
import { getProductById } from "../utils/helpers.js";

class Carts {
  constructor(products, userOwner, isActive) {
    this.products = products;
    this.userOwner= userOwner
    this.isActive= isActive;
}


     getAllCarts = async (req, res) => {
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


  getCartActive=async (req, res) => {
    try {
      const userId = req.user._id.toString();
    const cartActive = await CartsModel.find({userOwner: userId, isActive: true})


      res.json(cartActive);
    } catch (err) {
      res.status(500).json({
        error: 'hoala,',
      });
    }
  };
   
  //permite crear un carrito y devuelve su id
 createCart = async (req, res) => {

  const userId = req.user._id
  const products= []
  const isActive = true
  
  try {
      const newCart = new Carts(products,userId,isActive)
  
    
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };
  //acgrega un producto a un carrito del listado
  addNewProduct = async (req, res) => {
    try {
      const userId = req.user._id.toString()
      const carts = await CartsModel.find({userOwner: userId})
      const productId = req.params.productId;
     const cartActive = carts.filter((cart) => cart.isActive === true)
     if(cartActive.length === 0){
      await CartsModel.create({
				products:[],
				userOwner: userId,
				isActive: true

			  });
     }

     const cartActive2 = await CartsModel.findOne({userOwner: userId, isActive:true})
     const cartActiveId= cartActive2._id.toString()
    
  
      const cart = await CartsModel.findById(cartActiveId);
     
    
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
        { _id: cart._id, products:productsOfCart  },
        { new: true }
      );

      res.render('home')
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  };
  
  //Borra un producto del listado
 deleteProductOfCart = async (req, res) => {
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
  
 deleteCart = async (req, res) => {
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
}
export default Carts
