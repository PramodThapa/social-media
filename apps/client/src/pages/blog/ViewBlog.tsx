import { Avatar, Box, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FALLBACK_ID } from "~/constant";
import { useBlog, useBlogContent } from "~/hooks/blog/useBlog";

const ViewBlog = () => {
  const { id } = useParams();

  const { data } = useBlog(Number(id) || FALLBACK_ID);
  const { data: blogContent } = useBlogContent(data?.blog.contentUrl);

  if (!data || !blogContent) return <></>;

  const { blog, user } = data;

  return (
    <Box marginTop={3}>
      <Typography variant="h3" fontWeight={600} fontFamily={"inherit"}>
        {blog.thumbnail}
      </Typography>

      <Typography fontStyle={"italic"} fontFamily={"inherit"} marginTop={2}>
        <span>
          {`by`} {user.username}
        </span>
      </Typography>

      <Divider />

      {blog.imageUrl && (
        <Avatar
          alt="Upload"
          variant="square"
          src={blog.imageUrl}
          sx={{ width: "100%", height: 400, cursor: "pointer", marginTop: 2 }}
          className="image-upload__avatar"
        >
          Upload Image
        </Avatar>
      )}

      <div dangerouslySetInnerHTML={{ __html: blogContent }} />
    </Box>
  );
};

export default ViewBlog;
