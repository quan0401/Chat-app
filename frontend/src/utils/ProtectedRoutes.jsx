import { Outlet, Navigate } from "react-router-dom";

import axiosInstance from "../setup/axios";

function ProtectedRoutes() {
  let valid = true;

  axiosInstance.get("api/get-token").then((res) => {
    const { _id, name } = res.data;
    valid = name && _id ? true : false;
  });

  return valid ? <Outlet /> : Navigate({ to: "/login", replace: true });
}

export default ProtectedRoutes;
