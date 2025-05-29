const Event = require("../models/Events");
const eventSchema = require("../validations/event.validation");

const createEvent = async (req, res) => {
  const { error } = eventSchema.validate(req.body);
  console.log(req.body);
  try {
    const { title, description, dateTime, type, url, address, amount } =
      req.body;
    console.log(req.user);
    const host = req.user.id;
    if (error) {
      return res.status(400).json("Not Valid");
    }
    let event = null;
    if (type === "online") {
      event = await Event.create({
        title,
        description,
        dateTime,
        type,
        url,
        host,
        amount,
      });
    } else {
      event = await Event.create({
        title,
        description,
        dateTime,
        type,
        address,
        host,
        amount,
      });
    }
    return res.status(200).json("successfully created !");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something error occured");
  }
};
module.exports = createEvent;
