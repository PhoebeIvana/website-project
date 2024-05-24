// importing express framework
import express from "express";
// importing the controller
import {
  CreateFunction,
  GetFunction,
  UpdateFunction,
  DeleteFunction,
} from "./Controller/ShopController.js";
// importing cors
import cors from "cors";
// importing mongoose, ORM mapping the backend to the database
import mongoose from "mongoose";
// importing dotenv
import dotenv from "dotenv";

// defining the express for this app
const app = express();
const PORT = 3001;
const router = express.Router();
dotenv.config();

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middleware : Enable communications in between app
app.use(cors());
//Accepting data with the type of json
app.use(express.json());

// Route for Item
// Route for Create
router.post("/item", CreateFunction);
// Route for Read
router.get("/item", GetFunction);
// Route for Update
router.put("/item/:id", UpdateFunction);
// Route for Delete
router.delete("/item/:id", DeleteFunction);

const errorFunction = (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
};

app.use(router);
app.listen(PORT, errorFunction);
