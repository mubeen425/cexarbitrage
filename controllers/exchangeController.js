const axios = require("axios");
const Exchange = require("../models/exchangeModel");
const Coin = require("../models/coinModel");
// const Coin = require("../models/coinModel");

const getExchange = async (req, res) => {
  try {
    const exchange_data = [];
    const response_data = [];
    let coin = req?.query?.coin?.split('/');
    let coinName = coin[0];
    let coinSymbol = coin[1];
    // Fetch exchange data
    const exchangeResponse = await axios.get(
      `https://api.coincap.io/v2/assets/${coinName}/markets`,
    );
      // console.log("exchangeResponse: ", exchangeResponse.data.data)
    const exchanges = exchangeResponse.data.data;
    const meanPrice = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY,
        },
      }
    );
    // const exchangeUrls = await axios.get(
    //   `https://api.coincap.io/v2/exchanges`,
    // );
    // console.log("exchangeUrls: ", exchangeUrls.data.data.length)

    let ans =await meanPrice?.data?.data?.find((item)=>{
      return item.slug == coinName
    })
    const { quote: { USD: { price } } } = ans;
     console.log(price);
    
    const filteredExchanges = exchanges.filter(
      exchange => `${exchange.baseSymbol}/${exchange.quoteSymbol}` === `${coinSymbol}/USDT`
    );
    
    // Fetch market data
    if (filteredExchanges && filteredExchanges.length > 0) {
      for (let i = 0; i < filteredExchanges.length; i++) {
        const exchange = filteredExchanges[i];

        // Find existing exchange in the database
        const existingExchange = await Exchange.findOne({
          exchange_id: exchange.exchangeId.split(' ')[0],
        });

        if (existingExchange) {
          let exchangeUrls;
          if(existingExchange.exchange_url == undefined){
            const id = existingExchange.exchange_id.split('.')[0]
            console.log("ID : ", id)
            try {
              exchangeUrls = await axios.get(
                  `https://api.coincap.io/v2/exchanges/${id}`,
                );
              // console.log("exchangeUrls: ", exchangeUrls.data.data);
            }
            catch(err){
              console.log(err.response.data)
              existingExchange.exchange_url = ''
            }
          }

          // If existing exchange is found, update exchange_price
          existingExchange.exchange_price = exchange.priceUsd ? exchange.priceUsd : 'NA';
          existingExchange.exchange_pair = `${exchange.baseSymbol}/${exchange.quoteSymbol}`;
          existingExchange.exchange_symbol = exchange.baseSymbol;
          existingExchange.exchange_deviation_from_mean = (exchange.priceUsd - price)/ price 
          if(exchangeUrls != undefined) {existingExchange.exchange_url= exchangeUrls.data.data.exchangeUrl}
          await existingExchange.save();
        } else {
            //   const exchangeUrls = await axios.get(
            //       `https://api.coincap.io/v2/exchanges/${exchange.exchangeId.split(' ')[0]}`,
            //     );
            
            // console.log("exchangeUrls: ", exchangeUrls.data.data)
          // If not found, create a new exchange object
          const exchangeObj = {
            exchange_id: exchange.exchangeId.split(' ')[0],
            // exchange_url: exchangeUrls.data.data.exchangeUrl,
            exchange_name: exchange.exchangeId.split(' ')[0],
            exchange_price: exchange.priceUsd,
            exchange_pair: `${exchange.baseSymbol}/${exchange.quoteSymbol}`,
            exchange_quote: exchange.quoteSymbol,
            exchange_symbol: exchange.baseSymbol,
            non_kyc:'0%',
            img_url:'',
            exchange_deviation_from_mean: (exchange.priceUsd - price)/ price ,
            exchange_deposit: true,
            exchange_withdraw: true,
            isEditable: false,
          };

          exchange_data.push(exchangeObj);
          response_data.push(exchangeObj);
        }
      }

      
      // Calculate the mean for exchange_price before sorting
      // const mean =
      //   response_data.reduce(
      //     (sum, exchange) => sum + exchange.exchange_price,
      //     0,
      //   ) / response_data.length;

      // // Add "DEVIATION FROM MEAN" to each entry
      // response_data.forEach((exchange) => {
      //   exchange.deviation_from_mean = exchange.exchange_price - mean;
      // });

      // Insert new data into Exchange collection if exchange_data is not empty
      if (exchange_data.length > 0) {
        await Exchange.insertMany(exchange_data);
      }

      // Fetch all exchanges after the update
      const getAllExchanges = await Exchange.find({});
      const editableExchanges = await Exchange.countDocuments({
        isEditable: true,
      });
      let isAdmin = false;
      if(req.user.role == "admin") isAdmin = true;
      // Send the response after all the processing is done
      res.status(200).json({
        message: "Get Exchange Success",
        data: getAllExchanges,
        editableExchanges,
        isAdmin,
      });
    } else {
      // If no data is fetched, send an empty array
      res.status(200).json({ message: "Get Exchange Success", data: [] });
    }
  } catch (error) {
    res.status(500).json({
      message: "Get Exchange Failed!",
      error_message: error.message,
      error,
    });
  }
};




const getExchangeById = async (req, res) => {
  
  let { id } = req.query;
  

  try {
    const exchange = await Exchange.findOne({ _id: id });

    if (!exchange) {
      res
        .status(404)
        .json({ status: true, message: "No Exchange Found", exchange: {} });
    } else {
      res.status(200).json({
        status: true,
        message: "Get exchange success",
        exchange: exchange,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Get exchange failed", error: error });
  }
};

const addNewExchange = async (req, res) => {
  const { exchange_id, exchange_name, exchange_price, exchange_pair } =
    req.body;

  const newExchange = new Exchange({
    exchange_id: exchange_id,
    exchange_name: exchange_name,
    exchange_price: exchange_price,
    exchange_pair: exchange_pair,
    exchange_deposit: true,
    exchange_withdraw: true,
    isEditable: true,
  });

  try {
    const savedExchange = await newExchange.save();
    if (savedExchange) {
      res.status(200).json({
        status: true,
        message: "Add New Exchange Success",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Exchange created failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateExchange = async (req, res) => {
  const { exchange_id, exchange_name, exchange_price, exchange_pair , _id, exchange_deviation_from_mean, non_kyc, exchange_url, /*append_exchage_pair_info*/ } =
    req.body; // Assuming you want to update name and url, modify as needed
console.log(req.body,'req.body');

  try {
    if(req.user.role != "admin"){
      return res.status(400).json({
        status: false,
         message: "Only admin can edit the exchange data.",
      })
    }
    // Find the exchange by exchange_id
    const exchange = await Exchange.findOneAndUpdate(
      { _id: _id },
      {
        new: true,
      },
    );

    if (!exchange) {
      return res
        .status(404)
        .json({ status: false, message: "No Exchange Found", exchange: {} });
    }

    // Update the exchange properties
    exchange.exchange_name = exchange_name || exchange.exchange_name;
    exchange.exchange_price = exchange_price || exchange.exchange_price;
    exchange.exchange_pair = exchange_pair || exchange.exchange_pair;
    exchange.exchange_deviation_from_mean = exchange_deviation_from_mean || exchange.exchange_deviation_from_mean;
    exchange.non_kyc = non_kyc || exchange.non_kyc;
    exchange.exchange_url = exchange_url || exchange.exchange_url;
    // exchange.append_exchage_pair_info = append_exchage_pair_info || exchange.append_exchage_pair_info;

    // Save the updated exchange
    const updatedExchange = await exchange.save();
    console.log("updatedExchange: ",updatedExchange);
    res.status(200).json({
      status: true,
      message: "Update exchange success",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Update exchange failed",
      error: error.message,
    });
  }
};

const deleteExchange = async (req, res) => {
  const { id } = req.query; // Assuming you want to update name and url, modify as needed

  try {
    // Find the exchange by exchange_id
    const exchange = await Exchange.findOneAndDelete({ exchange_id: id });

    if (!exchange) {
      return res
        .status(404)
        .json({ status: false, message: "No Exchange Found", exchange: {} });
    } else {
      res.status(200).json({
        status: true,
        message: "Delete exchange success",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Update exchange failed",
      error: error.message,
    });
  }
};

module.exports = {
  getExchange,
  getExchangeById,
  addNewExchange,
  updateExchange,
  deleteExchange,
};
