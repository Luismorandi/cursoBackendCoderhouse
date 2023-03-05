import mongoose from "mongoose";


export const cartsCollectionName = "cart";

export const cartsSchema = new mongoose.Schema({
  products: { type: Array, required: true },
  userOwner: {type: String, required: true},
  isActive: {type: Boolean, required: true},

});

export const CartsModel =mongoose.model(cartsCollectionName, cartsSchema)
