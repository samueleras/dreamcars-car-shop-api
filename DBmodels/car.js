import mongoose from "mongoose";
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    leasing: {
      type: Number,
      required: true,
    },
    passengerCount: {
      type: Number,
      required: true,
    },
    doorCount: {
      type: Number,
      required: true,
    },
    gearbox: {
      type: String,
      required: true,
    },
    horsepower: {
      type: Number,
      required: true,
    },
    electric: {
      type: Boolean,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fuelConsumption: {
      type: String,
      required: true,
    },
    emissions: {
      type: String,
      required: true,
    },
    emissionClass: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    png: {
      type: String,
      required: true,
    },
    images: {
      type: [],
      required: false,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
