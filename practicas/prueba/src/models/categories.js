import mongoose from "mongoose";

export const categoriesCollectionName = "category";

const categoriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export const CategoryModel =mongoose.model(categoriesCollectionName, categoriesSchema)