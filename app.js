"use strict";

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Car from "./DBmodels/car.js";

dotenv.config();

// express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
/* app.use(cors()); */

// connect to MongoDb
await mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("Couldn't connect to db" + err));

// listen for requests on localhost:3000
app.listen(PORT);

// Use body parser for json or url
/* app.use(bodyParser.json()); //maybe use: app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); */

// static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  //Send static react page
  const cars = [
    { id: 1, brand: "Toyota", model: "Corolla" },
    { id: 2, brand: "Honda", model: "Civic" },
  ];
  res.json(cars);
});

// Send all car objects
app.get("/cars", async (req, res) => {
  try {
  } catch (err) {
    console.log("Failed to fetch car. " + err);
    send404(res, req);
  }
});

// Send single car object
app.get("/car/:id", async (req, res) => {
  try {
  } catch (err) {
    console.log("Failed to fetch car. " + err);
    send404(res, req);
  }
});

// errorpage
app.use((req, res) => {
  send404(res, req);
});

const send404 = (res, req) => {
  //Send error as response
};
