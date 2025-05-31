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
    .oneOf(["online", "physical", "hybrid"])
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

  tickets: Yup.array()
    .of(
      Yup.object().shape({
        ticketName: Yup.string().required("Ticket name is required"),
        price: Yup.number()
          .typeError("Price must be a number")
          .positive("Price must be greater than 0")
          .required("Price is required"),
        quantity: Yup.number()
          .typeError("Quantity must be a number")
          .integer("Must be an integer")
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
      })
    )
    .min(1, "At least one ticket type is required")
    .required("Tickets are required"),
});
