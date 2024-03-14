import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/Dashboard";
import AddNewCoin from "../pages/AddNewCoin";
import Exchanges from "../pages/Exchange";
import AddNewExchange from "../pages/Exchange/AddNewExchange";
import Membership from "../component/memberShip/membership";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path={"dashboard"} element={<DashboardPage />} />
      <Route path={"dashboard/add-new-coin"} element={<AddNewCoin />} />
      <Route path={"dashboard/exchanges"} element={<Exchanges />} />
      <Route path={"/dashboard/membership"} element={<Membership />} />

      <Route path={"dashboard/edit-coin/:coin_id"} element={<AddNewCoin />} />
      <Route path={"dashboard/add-new-exchange"} element={<AddNewExchange />} />
      <Route
        path={"dashboard/edit-exchange/:exchange_id"}
        element={<AddNewExchange />}
      />
    </Routes>
  );
};

export default PrivateRoutes;
