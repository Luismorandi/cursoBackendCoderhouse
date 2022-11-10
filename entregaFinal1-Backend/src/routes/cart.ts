import { Router, Request, Response } from "express";
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath =  path.resolve(__dirname, '../../carts.JSON');

const cart = Router();

const getData = async () => {
	return await fs.readFile(filePath, 'utf-8');
}
const writeData = async (object: any) =>{
	return await fs.writeFile(filePath, JSON.stringify(object, null, '\t'));
}
const filePathProduct =  path.resolve(__dirname, '../../products.JSON');



const getProducts = async () => {
	return await fs.readFile(filePathProduct, 'utf-8');
}


//Permite listar todos los productos guardados en el carrito.
 cart.get('/:id/products', async (req:Request, res:Response) => {
	const id = req.params.id
	const carts = JSON.parse(await getData())

	const index = carts.findIndex((obj: { id: string; }) => obj.id == id);
	const cart = carts[index]

	if(index < 0){
		return res.status(404).json({
			msg: `el producto con ${id} no existe` 
		})
	}

	res.json({
		data: cart.products
	});
});

//permite crear un carrito y devuelve su id
 cart.post('/', async (req: Request, res: Response) => {
		
	const carts = JSON.parse(await getData())

	const newCart = {
		id:uuidv4(),
		timeStamp: new Date,
		products: []
		
	}
	carts.push(newCart);

	writeData(carts)

	res.json({
		msg: 'Subido el nuevo producto',
		data: newCart
	})

}); 

//Incorpora productos al carritos por su id de producto
cart.post('/:id/products', async (req: Request, res: Response) => {
	
    const id = req.params.id
    const idProduct = req.body.id
	const carts = JSON.parse(await getData())
    const products1 = JSON.parse(await getProducts())

	const index = carts.findIndex((obj: { id: string; }) => obj.id == id);
	const cart = carts[index];
    const productsCart = cart.products
    const indexProduct = products1.findIndex((obj: { id: string; }) => obj.id == idProduct);
	const product = products1[indexProduct]
 
    console.log(idProduct)

      productsCart.push(product)
	


	 writeData(carts)

	res.json({
		msg: 'Subido el nuevo productoss',
		product: product,
        cart: carts[index]
	}) 
 
});

//Vacia un carrito y lo elimina.
cart.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const carts = JSON.parse(await getData())

	
	const index = carts.findIndex((obj: { id: string; }) => obj.id == id);
	

	if(!index ){
		return res.status(404).json({
			msg: `el producto con ${id} no existe` 
		})
	}

	carts.splice(index, 1);
    writeData(carts)


	res.json({
		msg: `Borrando producto con id ${id}`,
	})
})   
//elimina un producto del carrito por su id de cart y de producto.
cart.delete('/:id/products/:id_prod', async (req: Request, res: Response) => {
	const id = req.params.id;
    const idProduct = req.params.id_prod;
	const carts = JSON.parse(await getData())

	
	const index = carts.findIndex((obj: { id: string; }) => obj.id == id);
	const productsCart = carts[index].products
    const indexProduct = productsCart.findIndex((obj: { id: string; }) => obj.id == idProduct);

	if(!index ){
		return res.status(404).json({
			msg: `el producto con ${id} no existe` 
		})
	}

	productsCart.splice(indexProduct, 1);
    writeData(carts)


	res.json({
		msg: `Borrando producto con id ${idProduct} del carrito con id ${id}` ,
	})
})   

export default cart