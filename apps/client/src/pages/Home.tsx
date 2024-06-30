import { Grid } from "@mui/material";
import BlogCard from "~/component/blog/BlogCard";
import { useAllBlogs } from "~/hooks/blog/useBlog";

export const Home = () => {
  const { data: blogs } = useAllBlogs();

  return (
    <div style={{ marginTop: "10px" }} className="container">
      <Grid container spacing={3}>
        {blogs?.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
