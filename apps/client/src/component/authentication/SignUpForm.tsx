import React from "react";

import { useFormik } from "formik";

import { TextField, Button, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { signUpValidationSchema } from "../../schema";

export interface SignUpFormValue {
  username: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  handleSignUp: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ handleSignUp }) => {
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
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (value: SignUpFormValue, { setSubmitting, resetForm }) =>
      await handleSignUp(value, setSubmitting, resetForm),
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box>
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
