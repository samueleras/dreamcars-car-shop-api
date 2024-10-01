const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", userSchema);
module.exports = Car;
