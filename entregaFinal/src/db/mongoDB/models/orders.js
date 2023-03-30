import mongoose from "mongoose";


export const ordersCollectionName = "orders";

export const ordersSchema = new mongoose.Schema({
  products: { type: Array, required: true },
  userOwner: {type: String, required: true},
  email: {type: String, required: false},
  date: {type: Date, required: false},
  adress: {type: String, required: false},
  orderNumber: {type: String, required: false },
  status: {type: String, required: false}

});

export const OrdersModel =mongoose.model(ordersCollectionName, ordersSchema)
