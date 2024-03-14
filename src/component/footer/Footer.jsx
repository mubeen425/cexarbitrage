import React from "react";
import CoinDetails from "./CoinDetails";
import CopyRight from "./CopyRight";
import FooterLinks from "./Links";

const Footer = () => {
  const userFulLinks = [
    {
      name: "About",
      href: "#",
    },
    {
      name: "Blogs",
      href: "#",
    },
    {
      name: "Terms and Conditions",
      href: "#",
    },
  ];
  return (
    <footer className="bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <span className="self-center text-2xl font-semibold text-white">
                CEX ARBITRAGE
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <CoinDetails />
            <FooterLinks name={"Useful Links"} links={userFulLinks} />
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto border-gray-700 lg:my-8" />
        <CopyRight />
      </div>
    </footer>
  );
};

export default Footer;
