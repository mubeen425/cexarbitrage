import React from "react";

// ** Images
import CoinImg1 from "../../images/coinLogos/1.png";
import CoinImg2 from "../../images/coinLogos/2.png";
import CoinImg3 from "../../images/coinLogos/3.png";
import CoinImg4 from "../../images/coinLogos/4.png";
import CoinImg5 from "../../images/coinLogos/5.png";
import CoinImg6 from "../../images/coinLogos/6.png";
import CoinImg7 from "../../images/coinLogos/7.png";
import CoinImg8 from "../../images/coinLogos/8.png";
import CoinImg9 from "../../images/coinLogos/9.png";
import CoinImg10 from "../../images/coinLogos/10.png";

const CoinLogos = () => {
  return (
    <>
      <div className="columns-5 flex justify-between items-center space-x-4">
        <img src={CoinImg1} alt="coin Image" width={150} height={150} />
        <img src={CoinImg2} alt="coin Image" width={150} height={150} />
        <img src='/assets/ascendex.png' alt="coin Image" width={150} height={150} />
        <img src='/assets/tidex.png' alt="coin Image" width={150} height={130} />
        <img src={CoinImg5} alt="coin Image" width={150} height={150} />
      </div>
      <div className="pb-10 columns-5 flex justify-between items-center space-x-4">
        <img src='/assets/whitecoin.png' alt="coin Image" width={150} height={150} />
        <img src='/assets/Digifinex.svg.png' alt="coin Image" width={150} height={150} />
        <img src="/assets/coinbit.png" alt="coin Image" width={150} height={150} />
        <img src="/assets/bilaxy.png" alt="coin Image" width={150} height={150} />
        <img src="/assets/bibox.png" alt="coin Image" width={150} height={150} />
      </div>
    </>
  );
};

export default CoinLogos;
