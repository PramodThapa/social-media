import React from "react";

import { FormikHelpers, useFormik } from "formik";

import { TextField, Button, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { signUpValidationSchema } from "../../schema";

export interface SignUpFormValue {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  onSignUp: (
    value: SignUpFormValue,
    formikBag: FormikHelpers<SignUpFormValue>
  ) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: onSignUp,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email*"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.email}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />
      </Box>
      <Box paddingTop={"10px"}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username*"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values?.username}
          error={touched.username && !!errors.username}
          helperText={touched.username && errors.username}
        />
      </Box>
      <Box paddingY={"10px"}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password*"
          type="password"
          variant="outlined"
          onBlur={handleBlur}
          value={values.password}
          onChange={handleChange}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          type="password"
          variant="outlined"
          onBlur={handleBlur}
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          label="Confirm Password*"
          value={values.confirmPassword}
          error={touched.confirmPassword && !!errors.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
        style={{ marginTop: "20px" }}
      >
        Sign up
        <LoginIcon />
      </Button>
    </form>
  );
};
