import React from "react";
import FeatureListing from "./FeatureListing";

// ** Images
import RealTime from "../../images/services/real_time.png";

const OurFeatures = () => {
  return (
    <div className={"container mx-auto py-[70px]"}>
      <h2 className={"text-3xl font-bold"}>
        Our Product <span className={"text-blue-500"}>Features</span>
      </h2>
      <p className={"py-[50px] text-gray-500"}>
        These features form the basis of our service.
      </p>

      <div className={"columns-3"}>
        <FeatureListing
          title={"Real Time"}
          content={
            "The faster you fetch, the more edge users have, and we give our users an edge over everyone else"
          }
          src={RealTime}
          alt={"real time icon"}
        />
        <FeatureListing
          title={"Trading volume in arbitrage"}
          content={
            "Considering trading volume while calculating arbitrage helps to find the maximum profit and removes all the junk arbitrages"
          }
          src={RealTime}
          alt={"real time icon"}
        />
        <FeatureListing
          title={"Live tracking of arbitrage"}
          content={
            "One of the most unique features, let you see all the details pertaining to that arbitrage including the order books on a single screen"
          }
          src={RealTime}
          alt={"real time icon"}
        />
      </div>
      <div className={"columns-3 mt-8"}>
        <FeatureListing
          title={"Set Alerts"}
          content={
            "Never miss an opportunity even when you are away as we send the alerts on telegram and on your browser"
          }
          src={RealTime}
          alt={"real time icon"}
        />
        <FeatureListing
          title={"Set Investment Limit"}
          content={
            "Tell us the amount you want to invest and we will show arbitrages accordingly"
          }
          src={RealTime}
          alt={"real time icon"}
        />
        <FeatureListing
          title={"All charges included in the calculation"}
          content={
            "In arbitrage, we have considered all trading and transfer charges so that you have nothing to worry about"
          }
          src={RealTime}
          alt={"real time icon"}
        />
      </div>
    </div>
  );
};

export default OurFeatures;
