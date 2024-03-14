import React, { useEffect, useState } from "react";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";

const CustomSingleValue = ({ innerProps, data }) => (
  <div {...innerProps} className="flex items-center">
    <img src={data.image} alt={data.name} className="w-5 h-5 mr-2" />
    {data.label}
  </div>
);
const formatOptionLabel = ({ label, value, details }) => {
  if (details) {
    return (
      <div className="flex items-center">
        {/*<img src={details.image} alt={details.name} className="w-5 h-5 mr-2" />*/}
        <span
          style={{
            backgroundColor: details.isSelected ? "blue" : "transparent",
          }}
        >
          {label}
        </span>
      </div>
    );
  }
};

const Dropping = () => {
  const { data } = useFetch("api/exchange/get-exchange", {}, []);

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    if (data) {
      const options = [];
      data.data.map((exchange) => {
        options.push({
          value: exchange.exchange_id,
          label: exchange.exchange_name,
          details: {
            name: exchange.exchange_name,
            type: "coin",
            // image: exchange.image,
            price: exchange.exchange_price,
          },
        });
      });
      setOptions(options);
    }
  }, [data]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  const getContainerStyles = () => {
    // Check if BTC is selected
    const isBTCSelected = selectedOptions.some(
      (option) => option.value === "BTC Coin",
    );

    // Customize the container styles based on selection
    return {
      backgroundColor: isBTCSelected ? "blue" : "red",
      // Add other styles as needed
    };
  };

  return (
    <>
      <div>
        <Select
          className="w-96 mt-12 ml-32"
          // isMulti
          options={options}
          onChange={handleSelectChange}
          // value={selectedOptions}
          formatOptionLabel={selectedOptions && formatOptionLabel}
          // isClearable={true}
        />

        {/*{selectedOptions*/}
        {/*  .slice()*/}
        {/*  .reverse()*/}
        {/*  .map((selectedOption, index) => (*/}
        {Object.keys(selectedOptions).length > 0 && (
          <div
            // key={index}
            className="mt-4 p-4 border text-left border-gray-300 rounded-md w-4/5  ml-32 mb-4 "
          >
            <div className="flex items-center flex-row h-12 mt-0">
              {/*<img*/}
              {/*  src={selectedOptions.details?.image}*/}
              {/*  alt={selectedOptions.details?.name}*/}
              {/*  className="w-12 h-12"*/}
              {/*/>*/}
              <h2 className="text-2xl font-extrabold mt-2">
                {selectedOptions.details?.name}{" "}
                {/*{selectedOptions.length > 1 ? " " : ""}*/}
              </h2>
              <button
                className={`ml-8 px-4 w-28 h-12 rounded-md bg-green-500 text-white`}
              >
                {selectedOptions.details?.enabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            <p className="mt-4 ">
              {" "}
              <span className="text-xl font-extrabold ">Avg Price: </span>{" "}
              <span className="text-blue-500 font-extrabold text-2xl">
                {parseInt(selectedOptions.details?.price).toFixed(2)}
              </span>
            </p>
            {/*<p>*/}
            {/*  {" "}*/}
            {/*  <span className="text-xl font-extrabold ">Type:</span>{" "}*/}
            {/*  {selectedOptions.details?.type}*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*  {" "}*/}
            {/*  <span className="text-xl font-extrabold ">Block Time:</span>*/}
            {/*  {selectedOptions.details?.blockTime}*/}
            {/*</p>*/}
          </div>
        )}
        {/*))}*/}
      </div>
    </>
  );
};

export default Dropping;
