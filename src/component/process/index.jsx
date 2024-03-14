import React from "react";
import SimpleButton from "../UI/buttons/SimpleButton";
import Image from "../../images/automate_arb.png";

const Process = () => {
  return (
    <div className="bg-gray-100 mb-5">
      <div className={"container mx-auto py-[70px]"}>
        <h2 className={"text-5xl font-bold"}>
          <span className={"text-blue-500"}>Automate</span> your arbitrage
          process
        </h2>
        <p className={"py-5 text-gray-500"}>
          Introducing CEX ARBITRAGE Websocket API. This new feature helps you
          connect CEX ARBITRAGE strategies with your trading bot and let you do
          arbitrage automatically 24*7
        </p>
        <SimpleButton
          name={"Click Here To Learn More"}
          background_color={false}
        />
        <div className={"mt-10"}>
          <img src={Image} alt={"image"} />
        </div>
      </div>
    </div>
  );
};

export default Process;
