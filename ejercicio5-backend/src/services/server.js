const express = require('express');
const mainRouter = require('../routes/index')




const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))
app.use('/api', mainRouter);

module.exports = app ;

/* 
const express = require('express');
const path = require('path');
const fs = require('fs/promises');



const products = express();
products.use(express.static('public'));

const viewsFolderPath = path.resolve(__dirname, '../../views');
const filePath =  path.resolve(__dirname, '../../products.JSON');
products.set('view engine', 'ejs');
products.set('views', viewsFolderPath);


const getData = async () => {
	return await fs.readFile(filePath, 'utf-8');
}


products.get('/', (req, res) => {
  res.render('hello');
});


products.get('/products', async (req, res) => {
    const data =  JSON.parse(await getData());

  res.render('products', {data:data});
});







module.exports = products; */