// Require Mongoose
import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

export const ShopSchema = new Schema({
  //attributes and its data type
  item_name: String,
  price: Number,
  item_image: String,
  item_id: Number,
});

// Compile model from schema
export const ShopModel = mongoose.model("ShopModel", ShopSchema);
