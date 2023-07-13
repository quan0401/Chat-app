import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../setup/axios";

// Component canot return <Navigate to="/login" replace={true} />
function ProtectedRoutes() {
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    axiosInstance.get("api/get-token").then((res) => {
      setIsAuth(res.data._id);
    });
  }, [isAuth]);

  // If you remove this line it won't work as expected
  if (isAuth === undefined) return null;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace={true} />;
}

export default ProtectedRoutes;
