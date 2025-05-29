const Joi = require("joi");

const eventSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Event title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Event description is required",
  }),
  dateTime: Joi.string().required().messages({
    "string.empty": "Event date & time is required",
  }),
  type: Joi.string().valid("offline", "online").required().messages({
    "any.only": "Invalid event type",
    "string.empty": "Event type is required",
  }),

  url: Joi.when("type", {
    is: "online",
    then: Joi.string().uri().required().messages({
      "string.empty": "Event URL is required",
      "string.uri": "Enter a valid URL",
    }),
    otherwise: Joi.forbidden(),
  }),
  address: Joi.when("type", {
    is: "offline",
    then: Joi.string().required().messages({
      "string.empty": "Address is required",
    }),
    otherwise: Joi.forbidden(),
  }),
  amount: Joi.number().integer().required().messages({
    "number.base": "Amount must be a number",
    "number.integer": "Amount must be an integer",
  }),
});
module.exports = eventSchema;
