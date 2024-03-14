import React, { useState } from "react";
import Select, { components } from "react-select";

import Bitcoin from "../../images/bitoinnew.jpg";
import UTC from "../../images/partners/partner2.png";
import DDC from "../../images/poloniex.jpg";
import FDC from "../../images/charts/down.svg";

const options = [
  {
    value: "BTC Coin",
    label: "BTC",
    details: {
      name: "Bitcoin",
      enabled: true,
      avgPrice: "$37,109.541",
      type: "Coin",
      blockTime: "9.5 Minutes",
      image: Bitcoin, // Replace with the actual image URL
    },
  },
  {
    value: "UDC Coin",
    label: "UDC",
    details: {
      name: "UDC Coin",
      enabled: false,
      avgPrice: "$22,345.678",
      type: "Coin",
      blockTime: "8 Minutes",
      image: UTC, // Replace with the actual image URL
    },
  },
  {
    value: "DDC Coin",
    label: "DDC",
    details: {
      name: "DDC Coin",
      enabled: true,
      avgPrice: "$15,987.123",
      type: "Coin",
      blockTime: "10 Minutes",
      image: DDC, // Replace with the actual image URL
    },
  },
  {
    value: "MTC Coin",
    label: "MTC",
    details: {
      name: "MTC Coin",
      enabled: false,
      avgPrice: "$8,765.432",
      type: "Coin",
      blockTime: "12 Minutes",
      image: FDC, // Replace with the actual image URL
    },
  },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  // Add more styles as needed
};

const { Option } = components;

const CustomOption = ({ innerProps, label, data }) => (
  <Option {...innerProps}>
    <img
      src={data.details.image}
      alt={data.details.name}
      className="w-8 h-8 mr-2 rounded-full"
    />
    {label}
  </Option>
);

const Container = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <>
      <div>
        <Select
          className="w-96 mt-12 ml-32"
          isMulti
          options={options}
          onChange={handleSelectChange}
          value={selectedOptions}
          styles={customStyles}
          components={{
            Option: CustomOption,
            MultiValueLabel: CustomOption,
          }}
        />

        {selectedOptions
          .slice()
          .reverse()
          .map((selectedOption, index) => (
            <div
              key={index}
              className="mt-4 p-4 border text-left border-gray-300 rounded-md w-4/5  ml-32 mb-4 "
            >
              <div className="flex items-center flex-row h-12 mt-0">
                <img
                  src={selectedOption.details.image}
                  alt={selectedOption.details.name}
                  className="w-12 h-12"
                />
                <h2 className="text-2xl font-extrabold mt-2">
                  {selectedOption.details.name}{" "}
                  {selectedOptions.length > 1 ? " (and more)" : ""}
                </h2>
                <button
                  className={`ml-8 px-4 w-28 h-12 rounded-md bg-green-500 text-white`}
                >
                  {selectedOption.details.enabled ? "Enabled" : "Disabled"}
                </button>
              </div>

              <p className="mt-4 ">
                {" "}
                <span className="text-xl font-extrabold ">
                  Avg Price:{" "}
                </span>{" "}
                <span className="text-blue-500 font-extrabold text-2xl">
                  {selectedOption.details.avgPrice}
                </span>
              </p>
              <p>
                {" "}
                <span className="text-xl font-extrabold ">Type Coin:</span>{" "}
                {selectedOption.details.type}
              </p>
              <p>
                {" "}
                <span className="text-xl font-extrabold ">Block Time:</span>
                {selectedOption.details.blockTime}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Container;
