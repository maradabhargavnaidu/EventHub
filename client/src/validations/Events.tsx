import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  title: Yup.string().required("Event title is required"),
  description: Yup.string().required("Event description is required"),

  startDateTime: Yup.date()
    .required("Start date & time is required")
    .typeError("Must be a valid date"),
  endDateTime: Yup.date()
    .required("End date & time is required")
    .min(Yup.ref("startDateTime"), "End time must be after start time")
    .typeError("Must be a valid date"),

  type: Yup.string()
    .oneOf(["online", "physical", "hybrid", undefined])
    .required("Event type is required"),

  venueName: Yup.string().when("type", {
    is: (val: string) => val === "physical" || val === "hybrid",
    then: (schema) => schema.required("Venue name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  address: Yup.string().when("type", {
    is: (val: string) => val === "physical" || val === "hybrid",
    then: (schema) => schema.required("Address is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  onlineLink: Yup.string().when("type", {
    is: (val: string) => val === "online" || val === "hybrid",
    then: (schema) =>
      schema.required("Online link is required").url("Invalid URL"),
    otherwise: (schema) => schema.notRequired(),
  }),

  hostName: Yup.string().required("Host name is required"),
  contactEmail: Yup.string()
    .email("Enter a valid email")
    .required("Contact email is required"),
  contactPhone: Yup.string(),

  isPaidEvent: Yup.boolean().required(),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .when("isPaidEvent", {
      is: true,
      then: (schema) => schema.required("Price is required for paid events"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .when("isPaidEvent", {
      is: true,
      then: (schema) => schema.required("Quantity is required for paid events"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),
});
