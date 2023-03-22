import { buildSchema } from "graphql";
import {getAllProducts, getProductById, addProduct, updateProduct} from "./products.services.js"


export const graphqlSchema =  buildSchema(`

    type Product{
        _id: String
        title: String
        value: String
        thumbnail: String
        stock: String
    }
    type Query{
        getAllProducts:[Product]
        getProductById(_id:String!):Product
    }

    input ProductInput{
        title: String!
        value: String!
        thumbnail: String!
        stock: String!
    }
    type Mutation{
        addProduct(product:ProductInput):Product
        updateProduct(data:String!, productId:String!):Product
    }

`)

export const graphqlRoot={
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
}