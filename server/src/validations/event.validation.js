const Joi = require("joi");

const eventSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Event title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Event description is required",
  }),
  startDateTime: Joi.string().required().messages({
    "string.empty": "Start date & time is required",
  }),
  endDateTime: Joi.string().required().messages({
    "string.empty": "End date & time is required",
  }),
  type: Joi.string().valid("online", "physical", "hybrid").required().messages({
    "any.only": "Invalid event type",
    "string.empty": "Event type is required",
  }),
  venueName: Joi.when("type", {
    is: Joi.valid("physical", "hybrid"),
    then: Joi.string().required().messages({
      "string.empty": "Venue name is required",
    }),
    otherwise: Joi.forbidden(),
  }),
  address: Joi.when("type", {
    is: Joi.valid("physical", "hybrid"),
    then: Joi.string().required().messages({
      "string.empty": "Address is required",
    }),
    otherwise: Joi.forbidden(),
  }),
  onlineLink: Joi.when("type", {
    is: Joi.valid("online", "hybrid"),
    then: Joi.string().uri().required().messages({
      "string.empty": "Online meeting link is required",
      "string.uri": "Enter a valid URL",
    }),
    otherwise: Joi.forbidden(),
  }),
  hostName: Joi.string().required().messages({
    "string.empty": "Host name is required",
  }),
  contactEmail: Joi.string().email().required().messages({
    "string.email": "Enter a valid email",
    "string.empty": "Contact email is required",
  }),
  contactPhone: Joi.string().allow(null, ""),
  isPaidEvent: Joi.boolean().required(),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
  }),
});
module.exports = { eventSchema };
