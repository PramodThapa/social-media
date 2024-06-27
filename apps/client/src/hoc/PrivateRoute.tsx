import React from "react";

import { isEmpty } from "lodash";

import { Navigate, useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "~/services/localStorage";
import { ROUTE } from "~/constant/route";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  if (isEmpty(getUserFromLocalStorage())) {
    return <Navigate to={ROUTE.AUTH} state={{ from: location }} />;
  }

  return children;
};
