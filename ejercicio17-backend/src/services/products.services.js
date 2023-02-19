import Repository from "../db/persistence.js";
import { productsCollectionName, productsSchema } from "../db/mongoDB/models/products.js";

const productsCollection = new Repository(productsCollectionName, productsSchema);


export const getAllProducts = async () => {
    const products = await productsCollection.getAll()
    return products
}

export const getProductById = async (id) => {
    const product = await productsCollection.getById(id)
    return product
}

export const addProduct = async (product) => {
    
    const addProduct = await productsCollection.addProduct(product);
    return addProduct
	
}
export const updateProduct = async (data, productId) => {
    
    const productUpdated = await productsCollection.updateProduct(data, productId);
    return productUpdated
	
}

