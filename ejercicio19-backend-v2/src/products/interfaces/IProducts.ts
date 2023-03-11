import { Document } from "mongoose";

export interface IProduct extends Document {
    title: String,
    value: Number,
    thumbnail: String,
    stock:Number,
}