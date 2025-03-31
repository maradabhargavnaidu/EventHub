const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.empty": "Full name is required.",
      "string.min": "Full name must be at least 3 characters long.",
      "string.max": "Full name cannot exceed 50 characters.",
      "string.pattern.base": "Full name must contain only letters and spaces.",
    }),

  mail: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),

  phoneNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits.",
      "any.required": "Phone number is required.",
    }),

  password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 30 characters.",
      "string.pattern.base":
        "Password must contain at least one letter and one number.",
      "any.required": "Password is required.",
    }),

  role: Joi.string().valid("host", "attendee").required().messages({
    "any.only": "Role must be either 'host' or 'attendee'.",
    "any.required": "Role is required.",
  }),

  organization: Joi.when("role", {
    is: "host",
    then: Joi.string().trim().required().messages({
      "any.required": "Organization name is required for hosts.",
    }),
    otherwise: Joi.forbidden(),
  }),
});

const loginSchema = Joi.object({
  mail: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),

  password: Joi.string().trim().min(8).max(30).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password cannot exceed 30 characters.",
    "any.required": "Password is required.",
  }),
});

module.exports = { registerSchema, loginSchema };
