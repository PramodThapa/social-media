import { RouteObject } from "react-router-dom";
import { ROUTE } from "~/constant/route";
import CreateBlog from "~/pages/blog/CreateBlog";
import ViewBlog from "~/pages/blog/ViewBlog";

const BlogRoutes: RouteObject[] = [
  {
    path: ROUTE.CREATE_BLOG,
    element: <CreateBlog />,
  },
  {
    path: ROUTE.VIEW_BLOG,
    element: <ViewBlog />,
  },
  {
    path: ROUTE.UPDATE_BLOG,
    element: <></>,
  },
];

export default BlogRoutes;
