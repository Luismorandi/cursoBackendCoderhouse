import checkAdmin from "../middlewares/auth";
import { Router, Request, Response, NextFunction } from "express";
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath =  path.resolve(__dirname, '../../products.JSON');

const products = Router();

const getData = async () => {
	return await fs.readFile(filePath, 'utf-8');
}
const writeData = async (object: any) =>{
	return await fs.writeFile(filePath, JSON.stringify(object, null, '\t'));
}

//permite listar todos los productos disponibles
products.get('/:id?',  async (req:Request, res:Response) => {
	
	const id = req.params.id
	const products = JSON.parse(await getData())

	if(id){

		const index = products.findIndex((obj: { id: string; }) => obj.id == id);
		const product = products[index]
		
		if(index < 0){
			return res.status(404).json({
				msg: `el producto con ${id} no existe` 
			})
		}
		
		res.json({
			data: product
		});
	}
	else{

		
		res.json({
			data: products
		});
	}


});
	//incorpora productos al listado
products.post('/', checkAdmin, async (req: Request, res: Response) => {
	

	const { name, price, thumbnail } = req.body

	if(!name || !price || !thumbnail ) {
		return res.status(400).json({
			error: "Falta un dato"
		})
	}

	
	const products = JSON.parse(await getData())

	const newProduct = {
		name,
		price,
		thumbnail,
		stock: 100,
		timeStamp: new Date,
		codigo: uuidv4(),
		description:  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		id: uuidv4()
	}
	products.push(newProduct);

	writeData(products)

	res.json({
		msg: 'Subido el nuevo producto',
		data: newProduct
	})

});
//actualiza un producto del listado
products.put('/:id', checkAdmin, async (req: Request, res:Response) => {
	const numberId = req.params.id;
	const {name, price, thumbnail, id} = req.body;

	const products = JSON.parse(await getData())
	const index = products.findIndex((obj: { id: string; }) => obj.id == numberId);
	const product= products[index]

	if(index < 0){
		return res.status(404).json({
			msg: `El producto con ${id} no existe` 
		})
	}

	if(!name || !price || !thumbnail) {
		return res.status(400).json({
			error: "Falta un dato"
		})
	}

	const productUpdate = {
		name,
		price,
		thumbnail,
		stock: product.stock,
		timeStamp: product.timeStamp,
		codigo: product.codigo,
		description:  product.description,
		id: product.id
		
	}

	products.splice(index, 1, productUpdate);

	writeData(products)

	
	res.json({
		msg: `Producto actualizado con id ${id}`,
		data: productUpdate,
	})
});

//Borra un producto del listado
products.delete('/:id', checkAdmin, async (req: Request, res: Response) => {
	const id = req.params.id;
	const products = JSON.parse(await getData())

	
	const index = products.findIndex((obj: { id: string; }) => obj.id == id);
	

	if(index < 0){
		return res.status(404).json({
			msg: `el producto con ${id} no existe` 
		})
	}

	products.splice(index, 1);
    writeData(products)


	res.json({
		msg: `Borrando producto con id ${id}`,
	})
})  


export default products