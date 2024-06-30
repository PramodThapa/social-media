import { RouteObject } from "react-router-dom";
import { ROUTE } from "~/constant/route";
import FollowProfile from "~/pages/user/FollowProfile";

const UserRoutes: RouteObject[] = [
  {
    path: ROUTE.VIEW_FOLLOWER,
    element: <FollowProfile />,
  },
  {
    path: ROUTE.VIEW_PROFILE,
    element: <></>,
  },
  {
    path: ROUTE.EDIT_PROFILE,
    element: <></>,
  },
];

export default UserRoutes;
