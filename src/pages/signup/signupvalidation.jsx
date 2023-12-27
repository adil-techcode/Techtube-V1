// yup validation  schema for signup form validation

import * as yup from "yup";

const signUpSchema = yup.object({
  displayName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(10, "Must be at most 10 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(10, "Must be at most 10 characters")
    .required("Password is required"),
  conPassword: yup
    .string()
    .oneOf([yup.ref("password"), []], "Passwords must match")
    .required("Confirmation password is required"),
});

export default signUpSchema;
