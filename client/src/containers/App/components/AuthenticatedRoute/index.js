import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getToken } from "utils/localStorage";

const AuthenticatedRoute = () => {
  return getToken() ? <Navigate to="/explore" /> : <Outlet />;
};

export default AuthenticatedRoute;
