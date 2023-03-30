import mongoose from "mongoose";


export const messagesCollectionName = "messages";

export const messagesSchema = new mongoose.Schema({
  message: { type: String, required: true },
  userName: {type: String, required: true},
  date: {type: Date, required: false},
  adress: {type: String, required: false},
  userId: {type: String, required: true}

});

export const MessagesModel =mongoose.model(messagesCollectionName, messagesSchema)
