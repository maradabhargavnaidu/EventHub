const Event = require("../models/Events");

const getEventById = async (req, res) => {
  //   console.log(req.user);
  try {
    const event = Event.findById({ _id: req.user.id });
    console.log(event);
    return res.status(200).json(event);
  } catch (err) {
    console.log(err);
  }
};
module.exports = getEventById;
