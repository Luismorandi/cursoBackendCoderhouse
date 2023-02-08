import { ProductsModel } from "../db/mongoDB/models/products.js";
import { getAllProducts, getProductById } from "../services/products.services.js";

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

    createProduct = async (req, res) => {
        try {
            const { title, value, thumbnail, stock, categoryId } = req.body
            if (!title || !value || !thumbnail || !stock || !categoryId) {
                return res.status(400).json({
                    error: "Falta un dato"
                })
            }
            const newProduct = await ProductsModel.create({
                title,
                value,
                thumbnail,
                stock,
                categoryId
            })
            res.json({
                msg: 'Subido el nuevo producto',
                data: newProduct
            })
        } catch (err) {
            res.status(500).json({
                error: err.message,
            });
        }

    }
    //actualiza un producto del listado
    updateProduct = async (req, res) => {
        try {

            const numberId = req.params.id;
            const {
                title,
                value,
                thumbnail,
                stock,
                categoryId
            } = req.body;

            const product = await getProductById(numberId);
            if (!product) {
                return res.status(404).json({
                    msg: `El producto con ${id} no existe`
                })
            }


            if (!title || !value || !thumbnail || !stock || !categoryId) {
                return res.status(400).json({
                    error: "Falta un dato"
                })
            }

            const productUpdate = await ProductsModel.findByIdAndUpdate(numberId, {
                title,
                value,
                thumbnail,
                stock: product.stock,
                categoryId


            }, { new: true })



            res.json({
                msg: `Producto actualizado con id ${numberId}`,
                data: productUpdate,
            })
        } catch (err) {
            res.status(500).json({
                error: err.message,
            });

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

