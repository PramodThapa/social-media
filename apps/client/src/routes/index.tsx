import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import { ROUTE } from "~/constant/route";
import { Auth, Error404, Home } from "~/pages";
import PrivateRoutes from "./PrivateRoute";
import UserRoutes from "./UserRoute";
import BlogRoutes from "./BlogRoute";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: ROUTE.AUTH,
        element: <Auth />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: ROUTE.HOME,
        element: <Home />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
      ...UserRoutes,
      ...BlogRoutes,
    ],
  },
]);

export default router;
