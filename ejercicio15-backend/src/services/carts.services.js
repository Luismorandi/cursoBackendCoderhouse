import Repository from "../db/persistence.js";
import { cartsCollectionName, cartsSchema } from "../db/mongoDB/models/carts.js";

const cartsCollection = new Repository(cartsCollectionName, cartsSchema);


export const getAllCarts = async () => {
    const carts = await cartsCollection.getAll()
    return carts
}

export const getCartById = async (id) => {
    const cart = await cartsCollection.getById(id)
    return cart
}

export const getCartActive = async (par1, par2) => {

    const parameters = { userOwner: par1, isActive: par2 }
    const cartActive = await cartsCollection.getByParameters(parameters)
    return cartActive
}

export const getCartsByUserId = async (userId) => {
    const parameters = { userOwner: userId }
    const carts = await cartsCollection.getByParameters(parameters)
    return carts

}