"use strict";

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Car from "./DBmodels/car.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

// express app
const app = express();
const PORT = process.env.PORT || 3000;

// Filepaths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS for all origins
app.use(cors());

// connect to MongoDb
await mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("Couldn't connect to db" + err));

// listen for requests on localhost:3000
app.listen(PORT);

// parser for json
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, "public")));

// Send all car objects
app.post("/cars", async (req, res) => {
  try {
    const {
      vehicleType,
      gearboxType,
      minHorsePower,
      onlyElectric,
      minPrice,
      maxPrice,
      passengerCount,
      doorCount,
      searchText,
      sortOrder,
      pageSize,
    } = req.body || {};

    let queryObject = {};
    if (vehicleType) queryObject.type = vehicleType;
    if (gearboxType) queryObject.gearbox = gearboxType;
    if (minHorsePower) queryObject.horsepower = { $gte: minHorsePower };
    if (onlyElectric) queryObject.electric = true;
    if (passengerCount) queryObject.passengerCount = passengerCount;
    if (doorCount) queryObject.doorCount = doorCount;
    if (minPrice || maxPrice) {
      queryObject.price = {};
      if (minPrice) queryObject.price.$gte = minPrice;
      if (maxPrice) queryObject.price.$lte = maxPrice;
    }
    if (searchText)
      queryObject = {
        model: { $regex: ".*" + searchText + ".*", $options: "i" },
      };
    const cars = await Car.find(queryObject).exec();

    console.log(queryObject);

    res.json(cars);
  } catch (err) {
    console.log("Failed to fetch cars. " + err);
    send500(res);
  }
});

// Send single car object
app.get("/car/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (err) {
    console.log("Failed to fetch car. " + err);
    send500(res);
  }
});

app.post("/cars/bulk", async (req, res) => {
  try {
    const cars = await Car.find({ _id: { $in: req.body.ids } });
    res.json(cars);
  } catch (err) {
    console.log("Failed to fetch car. " + err);
    send500(res);
  }
});

// Catch-all route to serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const send500 = (res) => {
  //Send internal server error as response
  res.status(500).send("500 Internal Server Error");
};
