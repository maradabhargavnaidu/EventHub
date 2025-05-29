import * as Yup from "yup";

export const eventSchema = Yup.object({
  title: Yup.string().required("Event title is required"),
  description: Yup.string().required("Event description is required"),
  dateTime: Yup.string().required("Event date & time is required"),
  type: Yup.string()
    .oneOf(["offline", "online"], "Invalid event type")
    .required("Event type is required"),

  // Conditional validation based on 'type'
  url: Yup.string().when("type", {
    is: "online",
    then: (schema) =>
      schema.required("Event URL is required").url("Enter a valid URL"),
    otherwise: (schema) => schema.notRequired(),
  }),

  address: Yup.string().when("type", {
    is: "offline",
    then: (schema) => schema.required("Address is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .integer("Amount must be an integer")
    .required("Amount is required"),
});
