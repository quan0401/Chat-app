import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../setup/axios";
import LoginPage from "../pages/LoginPage";

// Component canot return <Navigate to="/login" replace={true} />
function ProtectedRoutes() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    axiosInstance
      .get("api/get-token")
      .then((res) => {
        setIsAuth(res.data._id);
      })
      .catch((error) => {
        navigate("/login");
      });
  }, [isAuth]);

  // If you remove this line it won't work as expected
  if (isAuth === undefined) return <LoginPage />;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace={true} />;
}

export default ProtectedRoutes;
