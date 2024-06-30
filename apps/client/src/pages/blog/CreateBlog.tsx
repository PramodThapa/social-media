import { Box } from "@mui/material";

import BlogForm, { BlogFormValues } from "~/component/blog/BlogForm";

import { useCreateBlog } from "~/hooks/blog/useBlog";
import { useFileUpload } from "~/hooks/files/useUploadFile";
import useIsLoggedIn from "~/hooks/useIsLoggedIn";

const CreateBlog = () => {
  const { mutateAsync: handleFileUpload, isError: hasFileError } =
    useFileUpload();
  const { mutateAsync: createBlog } = useCreateBlog();
  const { user } = useIsLoggedIn();

  const handleCreateBlog = async (values: BlogFormValues) => {
    const { content, imageUrl, thumbnail, description } = values;
    const contentBlob = new Blob([content], { type: "text/html" });
    const contentFile = new File([contentBlob], "content.html", {
      type: "text/html",
    });

    const formData = new FormData();
    formData.append("file", contentFile);

    const fileResponse = await handleFileUpload(formData);

    if (hasFileError) {
      return;
    }

    const payload = {
      thumbnail,
      description,
      imageUrl,
      contentUrl: fileResponse.fileUrl,
      authorId: user?.id || "",
    };

    await createBlog(payload);
  };
  return (
    <Box marginTop={3}>
      <BlogForm handleSubmit={handleCreateBlog} />
    </Box>
  );
};

export default CreateBlog;
