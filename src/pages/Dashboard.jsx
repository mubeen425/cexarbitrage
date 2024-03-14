import React from "react";

// ** Components
// import Dropping from "../component/dropdown/Dropping";
// import Table from "../component/table/Table";
// import LastRefresh from "../component/lastRefresh/LastRefresh";

// ** Layout
import MainLayout from "../component/layout/MainLayout";
import Process from "../component/process";
import OurFeatures from "../component/Features";
import HeroSection from "../component/heroSection";

const DashboardPage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <OurFeatures />
      <Process />
      {/*<Dropping />*/}
      {/*<Table />*/}
      {/*<LastRefresh />*/}
    </MainLayout>
  );
};

export default DashboardPage;
