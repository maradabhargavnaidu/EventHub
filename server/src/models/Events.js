const { ref } = require("joi");
const mongoose = require("mongoose");
const User = require("./Users");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
  },
  description: {
    type: String,
    required: [true, "Event description is required"],
  },
  startDateTime: {
    type: String,
    required: [true, "Start date & time is required"],
  },
  endDateTime: {
    type: String,
    required: [true, "End date & time is required"],
  },
  type: {
    type: String,
    enum: ["online", "physical", "hybrid"],
    required: [true, "Event type is required"],
  },
  venueName: {
    type: String,
    required: function () {
      return this.type === "physical" || this.type === "hybrid";
    },
  },
  address: {
    type: String,
    required: function () {
      return this.type === "physical" || this.type === "hybrid";
    },
  },
  onlineLink: {
    type: String,
    required: function () {
      return this.type === "online" || this.type === "hybrid";
    },
  },
  hostName: {
    type: String,
    required: [true, "Host name is required"],
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  contactEmail: {
    type: String,
    required: [true, "Contact email is required"],
    match: [/.+\@.+\..+/, "Enter a valid email"],
  },
  contactPhone: {
    type: String,
    default: null,
  },
  isPaidEvent: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0.01, "Price must be greater than 0"],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
});

module.exports = mongoose.model("Event", eventSchema);
