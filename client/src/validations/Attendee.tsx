import * as Yup from "yup";

export const registerAttendeeSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Full name must be at least 3 characters long.")
    .max(50, "Full name cannot exceed 50 characters.")
    .matches(/^[a-zA-Z\s]+$/, "Full name must contain only letters and spaces.")
    .required("Full name is required."),

  mail: Yup.string()
    .trim()
    .lowercase()
    .email("Invalid email format.")
    .required("Email is required."),

  phoneNumber: Yup.string()
    .trim()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Phone number is required."),

  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(30, "Password cannot exceed 30 characters.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one letter and one number."
    )
    .required("Password is required."),
});

export const loginAttendeeSchema = Yup.object({
  mail: Yup.string()
    .trim()
    .lowercase()
    .email("Invalid email format.")
    .required("Email is required."),

  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(30, "Password cannot exceed 30 characters.")
    .required("Password is required."),
});
