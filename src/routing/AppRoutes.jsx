import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";

// ** Components
import Login from "../component/login";
import Exchanges from "../pages/Exchange";

// ** Routes
import PrivateRoutes from "./PrivateRoutes";

// ** Pages
import DashboardPage from "../pages/Dashboard";

// ** Context
import { useAuth } from "../context/AuthContext";
import Register from "../component/register/register";
import { useEffect } from "react";

const AppRoutes = () => {
  const { token } = useAuth();
  const timer = localStorage.getItem("timer");

  
  return (
    <BrowserRouter>
      <Routes>
        {token ? (
             (
          <>
            <Route path={"/*"} element={<PrivateRoutes />} />
            <Route index element={<Navigate to={"/dashboard"} />} />
          </> ) 
        ) : (
          <>
            <Route path={"/"} element={<DashboardPage />} />
            <Route path={"/auth/register"} element={<Register />} />
            <Route path={"/auth/login"} element={<Login />} />
            <Route path={"/exchanges"} element={<Exchanges />} />
            <Route path={"*"} element={<Navigate to={"/"} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
