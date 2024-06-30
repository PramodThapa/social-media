import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "~/component/common/Header";
import { ROUTE } from "~/constant/route";
import useIsLoggedIn from "~/hooks/useIsLoggedIn";

const PublicRoutes = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTE.HOME, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PublicRoutes;
