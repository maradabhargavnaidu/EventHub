const Event = require("../models/Events");

const getYourEvents = async (req, res) => {
  try {
    const event = await Event.find({ host: new Object(req.user.id) });
    return res.status(200).json(event);
    // console.log(event);
  } catch (err) {
    console.log(err);
  }
};
module.exports = getYourEvents;
