import { ProductsModel } from "../models/products.js";

   export const  getProductById = async (productId) => {
        try {
          
            const product = await ProductsModel.findById(productId);
            return product
        } catch {
            res.status(500).json({
                error: err.message,
            });
        }
    };

  