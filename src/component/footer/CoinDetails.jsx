import React from "react";
import useFetch from "../../hooks/useFetch";

const CoinDetails = () => {
  const { data, loading } = useFetch("api/exchange/get-exchange", {}, []);
  return (
    <div>
      <h2 className="mb-6 text-sm font-semibold text-white">Coin Details</h2>
      <ul className="text-gray-400 font-medium">
        {!loading ? (
          data &&
          data.data.slice(0, 5).map((item, index) => (
            <li className="mb-4" key={index}>
              <a href={item.exchange_url} className="hover:underline">
                {item.exchange_name}
              </a>
            </li>
          ))
        ) : (
          <span className={"text-gray-400 font-medium"}>
            Loading...
          </span>
        )}
      </ul>
    </div>
  );
};

export default CoinDetails;
