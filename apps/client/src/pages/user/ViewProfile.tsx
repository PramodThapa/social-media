import { Avatar, Button, Divider, Grid } from "@mui/material";
import { ACTION, FALLBACK_ID } from "~/constant";
import { getAcronym } from "~/utils";
import "~/styles/__profile.scss";
import { useParams } from "react-router-dom";
import { useUser } from "~/hooks/user/userUser";
import { useUserBlog } from "~/hooks/blog/useBlog";
import BlogCard from "~/component/blog/BlogCard";
import useIsLoggedIn from "~/hooks/useIsLoggedIn";
// TODO: Redirect to edit page.
// import { Link } from "react-router-dom";
// import { ROUTE } from "~/constant/route";

const ViewProfile = () => {
  const { id } = useParams();

  const { data: user } = useUser(Number(id) || FALLBACK_ID);
  const { data: blogs } = useUserBlog(Number(id) || FALLBACK_ID);
  const { user: loggedInUser } = useIsLoggedIn();

  if (!user || !loggedInUser) return <></>;

  const { username } = user;
  const isLoggedInUser = user.id === loggedInUser.id;

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__header-info">
          <Avatar sx={{ height: 120, width: 120, fontSize: 60 }}>
            {getAcronym(username || "")}
          </Avatar>
          <div className="profile__header-info-details">
            <h4>{username}</h4>
          </div>
        </div>
        {isLoggedInUser && (
          <div className="profile__header-edit">
            <Button
              sx={{
                font: "inherit",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid black",
              }}
              color="inherit"
              // component={Link}
              // to={ROUTE.EDIT_PROFILE}
            >
              {ACTION.EDIT}
            </Button>
          </div>
        )}
      </div>

      <Divider />

      <Grid marginY={1} container spacing={3}>
        {blogs?.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ViewProfile;
