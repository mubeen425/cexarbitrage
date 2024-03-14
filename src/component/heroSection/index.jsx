import React from "react";

// ** Components
import SimpleButton from "../UI/buttons/SimpleButton";
import CoinLogos from "./CoinLogos";

// ** Images
import Globe from "../../images/illustrations/globe.png";

// ** React-icons
import { FaAngleRight } from "react-icons/fa";

// ** React Router Dom
import { Link } from "react-router-dom";

const HeroSection = () => {
  const currentUser = localStorage.getItem("token");
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="w-1/2 p-8 text-start">
            <h1 className="text-4xl text-gray-700 font-bold mb-4">
              Your <span className="text-blue-500">personal assistance</span>{" "}
              for cryptocurrency arbitrage
            </h1>
            <p className="text-sm text-gray-900 mb-8">
              Find the best trade and arbitrage opportunities using CEX
              ARBITRAGE powerful algorithm and real-time data exploration tools.
            </p>
            {/* Add additional content as needed */}
            <SimpleButton name={"Try For Free"} background_color={false} />
            <SimpleButton name={"View Demo"} text_color="text-white" />

            <p className="pt-3">
              <span className="text-gray-400">Already Have Account?</span>{" "}
              <Link
                to="/auth/login"
                className="ms-3 hover:underline text-gray-600"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="w-1/2">
            <img src={Globe} alt="Hero Image" className="w-full h-auto" />
          </div>
        </div>

        <div className="py-10">
          <CoinLogos />

          <Link
            to={currentUser ? "/dashboard/exchanges" : `/exchanges`}
            className="text-gray-400 flex justify-center items-center"
          >
            See All Exchanges <FaAngleRight className="ms-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
