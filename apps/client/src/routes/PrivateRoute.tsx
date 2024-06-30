import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "~/component/common/Header";
import { ROUTE } from "~/constant/route";
import { useVerifyAuth } from "~/hooks/user/userUser";
import { getAccessTokenFromLocalStorage } from "~/services";

const PrivateRoutes = () => {
  const navigate = useNavigate();

  const { data } = useVerifyAuth();

  useEffect(() => {
    if (!getAccessTokenFromLocalStorage()) {
      navigate(ROUTE.AUTH, { replace: true });
    }
  }, [data, navigate]);

  return (
    <>
      <Header />
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Outlet />
      </div>
    </>
  );
};

export default PrivateRoutes;
