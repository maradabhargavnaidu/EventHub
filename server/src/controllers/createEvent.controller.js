const { default: mongoose } = require("mongoose");
const { eventSchema } = require("../validations/event.validation");
const Events = require("../models/Events");

const createEvent = async (req, res) => {
  try {
    console.log(req.body);
    const { error, value } = eventSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
    }
    value.host = req.user.id;
    // const newValue = { ...req.user.id, value };
    const newEvent = new Events(value);
    const saved = await newEvent.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = createEvent;
