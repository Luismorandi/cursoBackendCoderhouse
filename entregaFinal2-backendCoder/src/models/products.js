import mongoose from "mongoose";


export const productsCollectionName = "product";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  thumbnail: { type: String, required: true},
  stock: { type: Number, required: true},

});

export const ProductsModel =mongoose.model(productsCollectionName, productsSchema)
