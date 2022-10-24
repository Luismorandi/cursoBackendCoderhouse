const express = require('express');
const path = require('path');
const fs = require('fs/promises');



const uploadProducts = express();
uploadProducts.use(express.static('public'));

const viewsFolderPath = path.resolve(__dirname, '../../views');
const filePath =  path.resolve(__dirname, '../../products.JSON');
uploadProducts.set('view engine', 'ejs');
uploadProducts.set('views', viewsFolderPath);


const getData = async () => {
	return await fs.readFile(filePath, 'utf-8');
}

const writeData = async (object) =>{
	return await fs.writeFile(filePath, JSON.stringify(object, null, '\t'));
}


uploadProducts.get('/', async (req, res) => {
    const data = "Ecommerce - Luis"
    
        res.render('uploadProducts',{data: data})
    });
    
    
uploadProducts.post('/', async (req, res) => {
	

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


   
	res.redirect('/api')
    
});









module.exports = uploadProducts;