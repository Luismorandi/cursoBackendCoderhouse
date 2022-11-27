import mongoose from "mongoose";


export const cartsCollectionName = "cart";

const cartsSchema = new mongoose.Schema({
  products: { type: Array, required: true }

});

export const CartsModel =mongoose.model(cartsCollectionName, cartsSchema)
