import { Router, Request, Response } from "express";
import fs from 'fs/promises';
import path from 'path';


const filePath =  path.resolve(__dirname, '../../products.JSON');

const products = Router();

const getData = async () => {
	return await fs.readFile(filePath, 'utf-8');
}


products.get('/:id', async (req:Request, res:Response) => {
	const id = req.params.id
	const products = JSON.parse(await getData())

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
});

/* products.post('/', async (req, res) => {
	

	const { name, price, thumbnail } = req.body;

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
		id: products.length + 10
	}
	products.push(newProduct);

	writeData(products)

	res.json({
		msg: 'Subido el nuevo producto',
		data: newProduct
	})
});

products.put('/:id', async (req, res) => {
	const numberId = req.params.id;
	const {name, price, thumbnail, id} = req.body;

	const products = JSON.parse(await getData())
	const index = products.findIndex(obj => obj.id == numberId);

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
		id: id
	}

	products.splice(index, 1, productUpdate);

	writeData(products)

	
	res.json({
		msg: `Producto actualizado con id ${id}`,
		data: productUpdate,
	})
});

products.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const products = JSON.parse(await getData())

	
	const index = products.findIndex(obj => obj.id == id);
	

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
})  */


export default products