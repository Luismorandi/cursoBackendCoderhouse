const fs = require('fs/promises');
const path = require('path');
const {Router} = require('express');

const filePath =  path.resolve(__dirname, '../../products.JSON');
console.log(filePath)

const routerProducts = Router();

const getData = async () => {
	return await fs.readFile(filePath, 'utf-8');
}

const writeData = async (object) =>{
	return await fs.writeFile(filePath, JSON.stringify(object, null, '\t'));
}

routerProducts.get('/',  async (req, res) => {
	const products = JSON.parse(await getData())
	res.send({
		data: products,
	});
});

routerProducts.get('/:id', async (req, res) => {
	const id = req.params.id
	const products = JSON.parse(await getData())

	const index = products.findIndex(obj => obj.id == id);
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

routerProducts.post('/', async (req, res) => {
	

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


routerProducts.delete('/:id', async (req, res) => {
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
}) 

routerProducts.put('/:id', async (req, res) => {
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
 

  module.exports = routerProducts
  
  