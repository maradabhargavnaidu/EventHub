const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },

    type: {
      type: String,
      enum: ["online", "physical", "hybrid"],
      required: true,
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

    hostName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },

    isPaidEvent: { type: Boolean, required: true },

    tickets: {
      type: [ticketSchema],
      validate: [
        (val) => val.length > 0,
        "At least one ticket type is required",
      ],
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
