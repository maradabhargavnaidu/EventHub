const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, lowercase: true, required: true },
    dateTime: { type: String, required: true },
    type: { type: String, required: true, enum: ["offline", "online"] },
    address: {
      type: String,
      required: function () {
        return this.type === "offline";
      },
    },
    url: {
      type: String,
      required: function () {
        return this.type === "online";
      },
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
