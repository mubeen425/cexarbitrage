import React, { useEffect, useState } from "react";
import bit from "../../assets/images/SM/bitcoin-btc-logo.png";
import eth from "../../assets/images/SM/ethereum-eth-logo.png";
import tee from "../../assets/images/SM/tether-usdt-logo.png";
import bnb from "../../assets/images/SM/bnb-bnb-logo.png";
import lit from "../../assets/images/SM/litecoin-ltc-logo.png";
import usd from "../../assets/images/SM/usd-coin-usdc-logo.png";
import dog from "../../assets/images/SM/dogecoin-doge-logo-alternative.png";
import poly from "../../assets/images/SM/polygon-matic-logo.png";
import trust from "../../assets/images/SM/trueusd-tusd-logo.png";
import xrp from "../../assets/images/SM/xrp-xrp-logo.png";
import busd from "../../assets/images/SM/binance-usd-busd-logo.png";
import QRCode from "react-qr-code";
import axios from "axios";


const Membership = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const useCryptoPrices = () => {
    const [cryptoPrices, setCryptoPrices] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
      axios
        .get("https://api.coingecko.com/api/v3/simple/price", {
          params: {
            ids: "bitcoin,ethereum,tether,binancecoin,litecoin,usd-coin,dogecoin,polygon-ecosystem-token,true-usd,ripple,binance-usd",
            vs_currencies: "usd",
          },
        })
        .then((response) => {
          setCryptoPrices(response.data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }, []);

    return { cryptoPrices, error };
  };

  // Function to convert amount
  const convertAmount = (amount, price) => {
    return amount / price;
  };
  // new state for tracking selected image
  const cryptoAddresses = {
    bitcoin: "bc1qr23d80jnhnzvyhqp8r3unsdafc8vl0crxlcdm2",
    ethereum: "0xBb3483C9ccAAC534A0023914eAc247C6310DFfA1",
    litecoin: "ltc1qc73ym8f4f0vmj3c4e5kl209ag4wk2ssa9006xy",
    xrp: "rnWRFGiFb45WMtCvFgdzJ6LuBkQhRcxNab",
    eth: "0xBb3483C9ccAAC534A0023914eAc247C6310DFfA1", // Replace with actual Ethereum address
    tee: "0xBb3483C9ccAAC534A0023914eAc247C6310DFfA1", // Replace with actual Tether address
    bnb: "0xBb3483C9ccAAC534A0023914eAc247C6310DFfA1", // Replace with actual Binance Coin address
    lit: "ltc1qc73ym8f4f0vmj3c4e5kl209ag4wk2ssa9006xy", // Replace with actual Litecoin address
    usd: "0xBb3483C9ccAAC534A0023914eAc247C6310DFfA1", // Replace with actual USD Coin address
    dog: "DAbi4B8HKQRcdmZ6SxZXe2j15SJeyBEfCn", // Replace with actual Dogecoin address
    poly: "0xBb3483C9ccAAC534A0023914eAc247C6310DFfA1", // Replace with actual Polygon address
    trust: "0xBb3483C9ccAAC534A0023914eAc247C6310DFfA1", // Replace with actual TrueUSD address
    busd: "0xBb3483C9ccAAC534A0023914eAc247C6310DFfA1", // Replace with actual Binance USD address
  };
  const imageData = [
    {
      id: "bit",
      name: "Bitcoin",
      src: bit,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.bitcoin, // Replace with actual Bitcoin address
    },
    {
      id: "eth",
      name: "Ethereum",
      src: eth,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.eth, // Replace with actual Ethereum address
    },
    {
      id: "tee",
      name: "Tether",
      src: tee,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.tee, // Replace with actual Tether address
    },
    {
      id: "bnb",
      name: "binancecoin",
      src: bnb,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.bnb, // Replace with actual Binance Coin address
    },
    {
      id: "lit",
      name: "Litecoin",
      src: lit,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.litecoin, // Replace with actual Litecoin address
    },
    {
      id: "usd",
      name: "usd-coin",
      src: usd,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.usd, // Replace with actual USD Coin address
    },
    {
      id: "dog",
      name: "Dogecoin",
      src: dog,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.dog, // Replace with actual Dogecoin address
    },
    {
      id: "poly",
      name: "polygon-ecosystem-token",
      src: poly,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.poly, // Replace with actual Polygon address
    },
    {
      id: "trust",
      name: "true-usd",
      src: trust,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.trust, // Replace with actual TrueUSD address
    },
    {
      id: "ripple",
      name: "ripple",
      src: xrp,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.xrp, // Replace with actual XRP address
    },
    {
      id: "busd",
      name: "binance-usd",
      src: busd,
      userID: "21633381",
      amount: "50 USD",
      address: cryptoAddresses.busd, // Replace with actual Binance USD address
    },
  ];

  const plans = 
    {
      name: "Start",
      price: 399,
      features: [
        "Capital Limit ~10000$",
        "3-5% profit per Cycle",
        "min start balance: 0.075 ETH",
        "12% Bot Fee",
        "Standard Support",
      ],
      modalContent:
        "This license allows beginners to get acquainted with the bot. Test it and start earning. The maximum capital that the bot will operate with, regardless of the chosen strategy, is limited to $5000. Maximum profit from 50% to 150% per month.",
    }
  

  const openModal = (plan) => {
    setSelectedPlanDetails(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);

  const openActivateModal = () => {
    setIsActivateModalOpen(true);
  };

  const closeActivateModal = () => {
    setIsActivateModalOpen(false);
  };
  const { cryptoPrices, error } = useCryptoPrices();
  const convertedAmount =
    selectedImage && cryptoPrices[selectedImage.name.toLowerCase()]
      ? convertAmount(
          selectedPlanDetails.price,
          cryptoPrices[selectedImage.name.toLowerCase()].usd
        )
      : null;

  return (
    <div>
        <div class="bg-gray-200 p-4" style={{minHeight: "100vh"}}>
    <div class="heading ">
        <h2 class="text-3xl text-blue-500 text-center font-bold mb-4">Empower Your Finances with Crypto Insight</h2>
        <p class="text-gray-700 text-center mb-4 max-w-xl mx-auto">Subscribe for exclusive insights, market trends, and
            expert webinars.
            Stay ahead with our crypto subscription and embrace the future of finance.</p>
    </div>
    <div class="flex flex-wrap justify-around mt-9">
        
        <div class="w-full md:w-1/2 mx-4 my-4 bg-white rounded-md overflow-hidden">
            <div class="bg-blue-500 text-white text-center py-4">
                <h1 class="text-2xl font-bold">Comparison Table</h1>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b border-gray-300 text-left">Features</th>
                            <th class="py-2 px-4 border-b border-gray-300 text-left">Free Card</th>
                            <th class="py-2 px-4 border-b border-gray-300 text-left">Paid Subscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-300 text-left">Premium Content</td>
                            <td class="py-2 px-4 border-b border-gray-300 text-left">Limited</td>
                            <td class="py-2 px-4 border-b border-gray-300 text-left">Unlimited</td>
                        </tr>
                        <tr class="text-left">
                            <td class="py-2 px-4 border-b border-gray-300">Events & Webinars</td>
                            <td class="py-2 px-4 border-b border-gray-300">None</td>
                            <td class="py-2 px-4 border-b border-gray-300">Exclusive Access</td>
                        </tr>
                        <tr class="text-left">
                            <td class="py-2 px-4 border-b border-gray-300">Early Feature Access</td>
                            <td class="py-2 px-4 border-b border-gray-300">No</td>
                            <td class="py-2 px-4 border-b border-gray-300">Yes</td>
                        </tr>
                        <tr class="text-left">
                            <td class="py-2 px-4 border-b border-gray-300">Community Forum Access</td>
                            <td class="py-2 px-4 border-b border-gray-300">Limited</td>
                            <td class="py-2 px-4 border-b border-gray-300">Full Access</td>
                        </tr>
                        <tr class="text-left">
                            <td class="py-2 px-4 border-b border-gray-300">Technical Support</td>
                            <td class="py-2 px-4 border-b border-gray-300">Basic</td>
                            <td class="py-2 px-4 border-b border-gray-300">Priority</td>
                        </tr>
                        <tr class="text-left">
                            <td class="py-2 px-4 border-b border-gray-300">Exclusive Reports</td>
                            <td class="py-2 px-4 border-b border-gray-300">None</td>
                            <td class="py-2 px-4 border-b border-gray-300">Regular Updates</td>
                        </tr>
                        <tr class="text-left">
                            <td class="py-2 px-4 border-b border-gray-300">Mobile App Access</td>
                            <td class="py-2 px-4 border-b border-gray-300">Limited</td>
                            <td class="py-2 px-4 border-b border-gray-300">Full Access</td>
                        </tr>
                        <tr class="text-left">
                            <td class="py-2 px-4">Exclusive Merchandise</td>
                            <td class="py-2 px-4">No</td>
                            <td class="py-2 px-4">Yes</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="max-w-md mx-4 my-4 bg-white rounded-md overflow-hidden shadow-md">
            <div class="bg-blue-500 text-white text-center py-4">
                <h1 class="text-2xl font-bold">Crypto Membership</h1>
            </div>
       
        <div class="p-4">
        <p class="mt-6 text-5xl font-bold text-blue-500 text-center">${plans?.price}</p>
        <p class="text-lg font-bold mt-2 text-gray-500 text-center">Lifetime Access</p>
        <div class="pt-4">
            <p class="text-gray-700">Main Keys Points: </p>
            <ul class="list-disc pl-6">
                {plans.features.map((feature)=>{
                   return <li>{feature}</li>
                }) }
            </ul>
        </div>
        <p class="mt-4">Stay tuned for exciting updates and opportunities in the crypto world!</p>
        <div class="btn flex justify-center mt-3" style={{width: "100%"}}>
            <button
            onClick={() => openModal(plans)}
                class="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 focus:outline-none mx-auto"
                style={{width: '70%'}}>
                BUY NOW
            </button>
        </div>
    </div>
   
        
            
        </div>
    </div>
</div>


     
      {isModalOpen && selectedPlanDetails && (
        <div
          className=" inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fixed"
          id="modal"
        >
          <div
            className="bg-white opacity-0.5 p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto my-8 border-[#393939] border-[3px] overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            {/* Your modal content here */}
            <div className="text-center">
              <h1 className="text-xl font-bold">
                {selectedPlanDetails.name} Plan - ${selectedPlanDetails.price}{" "}
                p/year
              </h1>
              <p className="mt-4 text-left">
                {selectedPlanDetails.modalContent}
              </p>
            </div>
            <div className="mt-8 text-center">
              <p>Select the cryptocurrency of payment</p>
              <div className="flex mt-4 -ml-6 gap-3">
                {imageData.map((data) => (
                  <img
                    key={data.id}
                    src={data.src}
                    alt={data.name}
                    className="w-8 cursor-pointer"
                    onClick={() => handleImageClick(data)}
                  />
                ))}

                {/* Info box for selected image */}

                {/*  */}
              </div>
            </div>
            <div className="mt-8 text-center">
              {selectedImage && (
                <div class="bg-gray-200 p-6 rounded-xl border-2 border-[#589B74] shadow-lg max-w-lg mx-auto my-8">
                  <div class="flex justify-start items-center ">
                    <div class="p-3 bg-white shadow">
                      <QRCode
                        value={`crypto:${selectedImage.address}?amount=${convertedAmount}`}
                        size={128}
                      />
                    </div>

                    <div class="ml-6">
                      <div class="mt-2">
                        <p class="text-xl -ml-4 text-black font-bold-500 ">
                          Send
                          <br></br>
                          {convertedAmount.toFixed(6)} {selectedImage.name}
                        </p>
                        <p class="text-sm text-gray-600 mt-1">
                          ( in one payment ) to:
                        </p>
                      </div>
                    </div>
                  </div>
                  <p class="py-2 rounded-lg shadow-inne text-sm text-white font-medium tracking-wide -ml-4 my-4 bg-black">
                    {selectedImage.address}
                  </p>
                  <div class="mt-6 p-4 bg-gray-700 rounded-lg shadow-inner">
                    <p class="text-xs text-gray-300 text-center">
                      If you send any other BTC amount, the payment system will
                      ignore it!
                    </p>
                  </div>

                  <div class="mt-6 flex items-center justify-start">
                    <div class="rounded-full h-5 w-4 bg-[#589B74] mr-3 animate-pulse"></div>

                    <p class="text-sm text-gray-800">Awaiting Payment...</p>
                  </div>
                </div>
              )}

              <h1 className="text-sm mt-9 ">If you have already paid</h1>
              <button
                onClick={openActivateModal}
                className="bg-black border-2 mt-2 border-[#589B74] text-white px-4 py-2 rounded-full"
              >
                Activate your license
              </button>
              {isActivateModalOpen && (
                <div
                  className="inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fixed"
                  id="activate-modal"
                >
                  <div
                    className="bg-white opacity-0.5 p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto my-8 border-[#393939] border-[3px] overflow-y-auto"
                    style={{ maxHeight: "90vh" }}
                  >
                    <label>Please enter your Transaction Id</label>
                    <input
                      className="text-sm mt-2 sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-[#00FFA2] w-fit py-2 focus:outline-none focus:border-green-400 text-black  bg-white"
                      type="text"
                    />
                    <div className="mt-4 text-center">
                      <button
                        onClick={closeActivateModal}
                        className="bg-black text-white px-4 py-2 rounded-full"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="bg-black text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
