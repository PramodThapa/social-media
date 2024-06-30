import * as yup from "yup";
import { FORM_VALIDATION_MESSAGE } from "~/constant";

/**
 * Form validation schema for sign up.
 */
export const signUpValidationSchema = yup.object({
  email: yup
    .string()
    .email(FORM_VALIDATION_MESSAGE.TYPE_VALID("email"))
    .required(FORM_VALIDATION_MESSAGE.REQUIRED("email")),
  username: yup.string().required(FORM_VALIDATION_MESSAGE.REQUIRED("Username")),
  password: yup
    .string()
    .min(6, FORM_VALIDATION_MESSAGE.MIN_LENGTH("Password", 6))
    .required(FORM_VALIDATION_MESSAGE.REQUIRED("Password")),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], FORM_VALIDATION_MESSAGE.MATCH("Password"))
    .required(FORM_VALIDATION_MESSAGE.REQUIRED("Password")),
});

/**
 * Form validation schema for login.
 */
export const loginValidationSchema = yup.object({
  email: yup.string().required(FORM_VALIDATION_MESSAGE.REQUIRED("Email")),
  password: yup.string().required(FORM_VALIDATION_MESSAGE.REQUIRED("Password")),
});
