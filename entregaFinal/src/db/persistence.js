import MongoDB from "./mongoDB/database.js";



export default class Repository{
    constructor(collection,schema){
        this.collection = new MongoDB(collection, schema)}

async getAll(){
 return await this.collection.getAll()
}

async getById(id){
    return await this.collection.getById(id)
}

async getByCategory(categoryId){
    return await this.collection.getByCategory(categoryId)
}
async addProduct(product){
    return await this.collection.addProduct(product)
}

async updateProduct(data, productId){
    return await this.collection.updateProduct(data, productId)
}

async getByParameters(parameters){
    return await this.collection.getByParameters(parameters)

}


}