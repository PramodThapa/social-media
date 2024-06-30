import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { TextEditor } from "../text-editor/TextEditor";

export interface BlogFormValues {
  content: string;
  imageUrl: string;
  thumbnail: string;
  description: string;
}

export interface BlogFormProps {
  handleSubmit: (value: BlogFormValues) => void;
  initialValues?: BlogFormValues;
}

const BlogForm = ({ initialValues, handleSubmit }: BlogFormProps) => {
  const formik = useFormik<BlogFormValues>({
    initialValues: {
      imageUrl: initialValues?.imageUrl || "",
      thumbnail: initialValues?.thumbnail || "",
      content: initialValues?.content || "",
      description: initialValues?.content || "",
    },
    validationSchema: Yup.object({
      thumbnail: Yup.string().required("Thumbnail is required"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: handleSubmit,
  });

  const handleEditorInputChange = (newValue: string) => {
    formik.setFieldValue("content", newValue);
  };

  useEffect(() => {
    if (initialValues) {
      formik.setValues(initialValues);
    }
  }, [initialValues]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography fontWeight={600} variant="h4">
            {initialValues ? "Update Blog" : "Create Blog"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="thumbnail"
            name="thumbnail"
            label="Thumbnail*"
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
            helperText={formik.touched.thumbnail && formik.errors.thumbnail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description*"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextEditor
            handleChange={handleEditorInputChange}
            editorValue={formik.values.content}
          />
          {formik.touched.content && formik.errors.content && (
            <Typography
              style={{
                fontSize: "13px",
                marginTop: "6px",
                paddingLeft: "10px",
              }}
              color="error"
              variant="body2"
            >
              {formik.errors.content}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{
              fontSize: "16px",
              textTransform: "none",
              backgroundColor: "#442ce2",
            }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            {initialValues ? "Update" : "Create"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogForm;
