"use strict";

const express = require("express");
const mongoose = require("mongoose");
const Car = require("./DBmodels/car");

// express app
const app = express();

// connect to MongoDb
const dbURI = require("./modules/mongoDbLogin.js");
mongoose
  .connect(dbURI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("Couldn't connect to db" + err));

// listen for requests on localhost:3000
app.listen(3000);

// Use body parser for json or url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  //Send static react page
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
