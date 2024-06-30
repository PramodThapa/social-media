import React from "react";

import { useFormik } from "formik";

import { TextField, Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { loginValidationSchema } from "~/schema";

export interface LoginInFormValue {
  email: string;
  password: string;
}

interface LoginFormProps {
  initialValue: LoginInFormValue;
  onFormSubmit: (value: LoginInFormValue) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onFormSubmit,
  initialValue,
}) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: loginValidationSchema,
    onSubmit: onFormSubmit,
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
      <Box paddingY={"10px"}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password*"
          type="password"
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />
      </Box>

      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
      >
        Login
        <LoginIcon />
      </Button>
    </form>
  );
};
