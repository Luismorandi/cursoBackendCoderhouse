
import { ProductsModel } from '../models/products.js'
import { Router } from "express";
import checkAdmin from '../middlewares/auth.js';
import { v4 as uuidv4 } from 'uuid';


const products = Router();
//trae todos los productos
export const getAllProducts =  async (req, res) => {

 try{

const products= await ProductsModel.find();
res.json({
	data: products
			})
		} catch (err){
	res.status(500).json({
		error: err.message
	})
}

	

};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await ProductsModel.find();

    if (id) {
      const index = products.findIndex((obj) => obj.id == id);
      const product = products[index];

      if (index < 0) {
        return res.status(404).json({
          msg: `el producto con ${id} no existe`,
        });
      }
	  else{
		res.json({
			data: product
		});
	  }
    }
  } catch {
    res.status(500).json({
      error: err.message,
    });
  }
};
 	//incorpora productos al listado
export const createProduct = async (req, res) => {
	try{
		const { title, value, thumbnail, stock } = req.body
		if(!title || !value || !thumbnail || !stock) {
			return res.status(400).json({
				error: "Falta un dato"
			})
		}
		const newProduct = await ProductsModel.create({
			title,
			value,
			thumbnail,
			stock,
		})
		res.json({
			msg: 'Subido el nuevo producto',
			data: newProduct
		})
	} catch(err){
		res.status(500).json({
			error: err.message,
		  });
	}
		
}
//actualiza un producto del listado
export const updateProduct = async (req, res) => {
try{

	const numberId = req.params.id;
	const {
		title,
		value,
		thumbnail,
		stock
	} = req.body;
	
	const product = await ProductsModel.findById(numberId)
	if (!product) {
		return res.status(404).json({
					msg: `El producto con ${id} no existe`
				})
			}
			
			
			if (!title || !value || !thumbnail || !stock) {
				return res.status(400).json({
					error: "Falta un dato"
				})
			}
			
			const productUpdate = await ProductsModel.findByIdAndUpdate(numberId,{
				title,
				value,
				thumbnail,
				stock: product.stock,
				
				
			}, {new: true})
			
			
			
			res.json({
				msg: `Producto actualizado con id ${numberId}`,
				data: productUpdate,
			})
		}catch(err){
			res.status(500).json({
				error: err.message,
			  });

		}
		};
		
//Borra un producto del listado
export const deleteProduct = async (req, res) => {
	try{

		const numberId = req.params.id;
		const product = await ProductsModel.findById(numberId)
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
			}catch(err){
				res.status(500).json({
					error: err.message,
				  });
	
			}
			};

export default products

/* export const getAllProducts = async (req:Request,res: Response) => {

    try{
        const products = await ProductsModel.find();
        res.json({
            data: products,
        })

    }catch (err){
        res.status(500).json({
            error: err.message
        })
    }

}

export const getProductById = async (req, res) =>{


} */