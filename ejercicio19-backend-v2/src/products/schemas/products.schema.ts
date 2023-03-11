import { Schema } from "mongoose";

export const ProductSchema = new Schema({
    title: String,
    value: Number,
    thumbnail: String,
    stock: Number,
})

