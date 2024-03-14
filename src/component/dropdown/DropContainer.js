import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Bitcoin from "../../images/bitoinnew.jpg";
import UTC from "../../images/partners/partner2.png";
import DDC from "../../images/poloniex.jpg";
import FDC from "../../images/charts/down.svg";

const DropContainer = () => {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const coinDetails = {
    BTC: {
      name: "Bitcoin ",
      enabled: true,
      avgPrice: "$37,109.541",
      type: " Coin",
      blockTime: "9.5 Minutes",
      image: Bitcoin, // Replace with the actual image path
    },
    UTC: {
      name: "UTC Coin",
      enabled: false,
      avgPrice: "$37,109.541",
      type: " Coin",
      blockTime: "8 Minutes",
      image: UTC, // Replace with the actual image path
    },
    DDC: {
      name: "DDC Coin",
      enabled: true,
      avgPrice: "$37,109.541",
      type: " Coin",
      blockTime: "10 Minutes",
      image: DDC, // Replace with the actual image path
    },
    FDC: {
      name: "FDC Coin",
      enabled: false,
      avgPrice: "$37,109.541",
      type: " Coin",
      blockTime: "12 Minutes",
      image: FDC,
    },
  };

  const handleRemoveCoin = (coin) => {
    setSelectedCoins(
      selectedCoins.filter((selectedCoin) => selectedCoin !== coin)
    );
    setSelectedDetails(null);
    setShowDetails(false);
  };

  const handleCollapseDetails = () => {
    setSelectedDetails(null);
    setShowDetails(false);
  };
  const handleSelectChange = (e) => {
    e.stopPropagation();

    const selectedCoin = e.target.value;

    // Check if the selected coin is not already in the list
    if (selectedCoin && !selectedCoins.includes(selectedCoin)) {
      // Remove the first coin if there are already selected coins
      const updatedCoins =
        selectedCoins.length > 0 ? selectedCoins.slice(1) : selectedCoins;

      // Add the new selected coin
      setSelectedCoins([selectedCoin, ...updatedCoins]);
      handleShowDetails(selectedCoin);
    }
  };

  const handleSelectedCoinClick = (coin, event) => {
    const isButtonOrParentClick =
      event.target.classList.contains("coin-remove-button") ||
      event.target.closest(".coin-remove-button") !== null;

    if (isButtonOrParentClick) {
      handleRemoveCoin(coin);
    } else {
      // If it's not the button, perform the dropdown action
      console.log(`Closing dropdown for ${coin}`);
      handleCollapseDetails();
    }

    // Prevent event propagation to the container
    event.stopPropagation();
  };

  const handleShowDetails = (coin) => {
    setSelectedDetails(coinDetails[coin]);
    setShowDetails(true);

    // Adjust the width of the dropdown
    const dropdown = document.querySelector(".dropdown-select");
    if (dropdown) {
      dropdown.style.width = "50%"; // You can adjust the percentage as needed
    }
  };

  return (
    <div className="mt-8 ">
      <div className="relative w-96  ml-32">
        {selectedCoins.length > 0 && (
          <div className="absolute inset-y-0 left-0 flex items-center pr-2 pointer-events-none">
            {selectedCoins.map((coin) => (
              <div
                key={coin}
                onClick={() => handleSelectedCoinClick(coin)}
                className="flex items-center bg-blue-500 text-white rounded-md p-1 ml-2 coin-container"
              >
                <img
                  src={coinDetails[coin].image}
                  alt={coinDetails[coin].name}
                  className="w-5 h-5 mr-2"
                />
                <span onClick={() => handleShowDetails(coin)}>
                  {coinDetails[coin].name}
                </span>
                <button
                  onClick={() => handleRemoveCoin(coin)}
                  className="ml-1 mr-1 text-white hover:text-white cursor-pointer coin-remove-button"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
        )}

        <select
          className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleSelectChange}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="">Select a Coin</option>
          <option value="BTC">BTC</option>
          <option value="UTC">UTC</option>
          <option value="DDC">DDC</option>
          <option value="FDC">FDC</option>
        </select>
      </div>

      {showDetails && selectedDetails && (
        <div className="mt-4 p-4 border text-left border-gray-300 rounded-md w-4/5  ml-32 mb-4 ">
          <div className="flex items-center flex-row h-12 mt-0">
            <img
              src={selectedDetails.image}
              alt={selectedDetails.name}
              className="w-12 h-12"
            />
            <h2 className="text-2xl font-extrabold mt-2">
              {selectedDetails.name} BTC
            </h2>
            <button
              className={`ml-8 px-4 w-28 h-12 rounded-md bg-green-500 text-white`}
            >
              {selectedDetails.enabled ? "Enabled" : "Disabled"}
            </button>
          </div>

          <p className="mt-4 ">
            {" "}
            <span className="text-xl font-extrabold ">Avg Price: </span>{" "}
            <span className="text-blue-500 font-extrabold text-2xl">
              {selectedDetails.avgPrice}
            </span>
          </p>
          <p>
            {" "}
            <span className="text-xl font-extrabold ">Type Coin:</span>{" "}
            {selectedDetails.type}
          </p>
          <p>
            {" "}
            <span className="text-xl font-extrabold ">Block Time:</span>{" "}
            {selectedDetails.blockTime}
          </p>
        </div>
      )}
    </div>
  );
};

export default DropContainer;
