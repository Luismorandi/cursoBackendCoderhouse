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

async getByParameters(parameters){
    return await this.collection.getByParameters(parameters)

}


}