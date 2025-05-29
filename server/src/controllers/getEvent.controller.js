const Event = require("../models/Events");

const getEvent = async (req, res) => {
  try {
    console.log(req.user.id);
    const event = await Event.find();
    // console.log(event);
    return res.status(200).json(event);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getEvent;
