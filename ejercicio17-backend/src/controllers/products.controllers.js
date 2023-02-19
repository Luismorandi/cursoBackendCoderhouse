import { ProductsModel } from "../db/mongoDB/models/products.js";
import { getAllProducts, getProductById, addProduct, updateProduct } from "../services/products.services.js";

class Products {



    getAllProducts = async (req, res) => {

        try {
            const products = await getAllProducts()
            res.json({
                products
            })
        } catch (err) {
            res.status(500).json({
                error: err.message
            })
        }



    };

    getProductById = async (req, res) => {
        try {
            const productId=  req.params.id
            const product = await getProductById(productId)
            res.json({
                product
            })
        } catch (err) {
            res.status(500).json({
                error: 'No hay productos con ese id'
            })
        }



    }

    addProduct = async (req, res) => {
        try {
            const newProduct=  req.body
            const productAdded = await addProduct(newProduct)
            res.json({
                productAdded
            })
        } catch (err) {
            res.status(500).json({
                error: 'No se pudo añadir el producto'
            })
        }

    }
    //actualiza un producto del listado
    updateProduct = async (req, res) => {
        try {
            const dataUpdate=  req.body
            const productId= req.params.productId
            const productUpdated = await updateProduct(dataUpdate, productId)
            res.json({
                productUpdated
            })
        } catch (err) {
            res.status(500).json({
                error: 'No se pudo actualizar el producto'
            })
        }
    };

    //Borra un producto del listado
    deleteProduct = async (req, res) => {
        try {

            const numberId = req.params.id;
            const product = await getProductById(numberId);
            if (!product) {
                return res.status(404).json({
                    msg: `El producto con ${id} no existe`
                })
            }

            await ProductsModel.findByIdAndDelete(numberId);
            res.json({
                msg: `Producto eliminado con id ${numberId}`,
                data: product,
            })
        } catch (err) {
            res.status(500).json({
                error: err.message,
            });

        }
    };
}

export default Products

