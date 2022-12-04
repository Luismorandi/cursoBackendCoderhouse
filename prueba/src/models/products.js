import mongoose from "mongoose";
import { categoriesCollectionName } from "./categories";

export const productsCollectionName = "product";

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  thumbnail: { type: String, required: true},
  stock: { type: Number, required: true},
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: categoriesCollectionName,
    required: true
  }
});

export const ProductsModel =mongoose.model(productsCollectionName, productsSchema)
