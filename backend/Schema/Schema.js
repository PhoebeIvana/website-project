// Require Mongoose
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define a schema
const Schema = mongoose.Schema;

export const ShopSchema = new Schema({
  //attributes and its data type
  item_name: String,
  price: Number,
  item_image: String,
  item_id: Number,
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
      return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
      throw new Error(error);
  }
}

// Compile model from schema
export const ShopModel = mongoose.model("ShopModel", ShopSchema);
export const User = mongoose.model("User", UserSchema);
