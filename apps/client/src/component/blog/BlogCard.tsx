import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Blog } from "~/types/interface";

import { useNavigate } from "react-router-dom";
import { ROUTE } from "~/constant/route";
import { interpolate } from "~/utils";

export interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { thumbnail, id, description, imageUrl } = blog;
  const navigator = useNavigate();

  const handleViewMoreClick = () => {
    navigator(interpolate(ROUTE.VIEW_BLOG, { id }));
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrl || "https://picsum.photos/200"}
      />
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          fontFamily={"inherit"}
        >
          {thumbnail}
        </Typography>
        <Typography
          variant="body2"
          fontFamily={"inherit"}
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{
            textTransform: "none",
            fontSize: "16px",
            fontFamily: "inherit",
          }}
          onClick={handleViewMoreClick}
          size="small"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
