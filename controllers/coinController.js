const axios = require("axios");
const Coin = require("../models/coinModel");
const Exchange = require("../models/exchangeModel");

const getCoin = async (req, res) => {
  console.log('ok');
  // const apiURL = "https://api.coingecko.com/api/v3/coins/list";
  const apiCoinMarketURL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
  // const response = await axios.get(apiURL);
  // const coinsData = response.data.slice(0, 50);

  const coins = await Coin.find({});

  // if (responseMarket.data.status.error_code === 429) {
  //   // await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 1 minute
  //   // return getCoin(req, res);
  //   res
  //     .status(200)
  //     .json({ status: true, message: "Get coin success", coin: coins });
  // }

  try {
    if (coins) {
      res
        .status(200)
        .json({ status: true, message: "Get coin success", coin: coins });
    } else {
      const responseMarket = await axios.get(apiCoinMarketURL);
      const coinsMarketData = responseMarket.data.slice(0, 50);

      const selectedCoins = coinsMarketData.map((coin) => ({
        coin_id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        current_price: coin.current_price,
        image: coin.image,
      }));

      for (const coinData of coinsMarketData) {
        // Check if the coin already exists
        const existingCoin = await Coin.findOne({ coin_id: coinData.id });

        if (!existingCoin) {
          // If the coin doesn't exist, add it to the database
          const newCoin = new Coin({
            coin_id: coinData.id,
            name: coinData.name,
            symbol: coinData.symbol,
            current_price: coinData.current_price,
            image: coinData.image,
          });

          // Find the corresponding exchange for the coin
          const correspondingExchange = await Exchange.findOne({
            exchange_id: coinData.id, // Assuming you have this information in your coinData
          });

          // Set the exchange_id reference in the coin model
          if (correspondingExchange) {
            newCoin.exchange = correspondingExchange._id;
          }

          const savedCoin = await newCoin.save();

          // Update the coins array in the corresponding exchange
          if (correspondingExchange) {
            correspondingExchange.coins.push(savedCoin._id);
            await correspondingExchange.save();
          }
        }
      }
      res.status(200).json({
        status: true,
        message: "Get coin success",
        coin: selectedCoins,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Get coin failed", error: error });
  }
};

const getCoinById = async (req, res) => {
  const { id } = req.query;
  try {
    const coin = await Coin.findOne({ coin_id: id });

    if (!coin) {
      res
        .status(404)
        .json({ status: true, message: "No Coin Found", coin: {} });
    } else {
      res
        .status(200)
        .json({ status: true, message: "Get coin success", coin: coin });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Get coin failed", error: error });
  }
};

const addNewCoin = async (req, res) => {
  const { coin_id, name, symbol, current_price } = req.body;

  const newCoin = new Coin({
    coin_id: coin_id,
    name: name,
    symbol: symbol,
    current_price: current_price,
    isEditable: true,
  });

  // const coin = await Coin.create({ name, symbol, current_price });

  try {
    const savedCoin = await newCoin.save();
    if (savedCoin) {
      res.status(200).json({
        status: true,
        message: "Add New Coin Success",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Coin created failed",
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

const updateCoin = async (req, res) => {
  const { coin_id, name, symbol, current_price } = req.body;

  try {
    // Find the coin by coin_id
    const coin = await Coin.findOneAndUpdate(
      { coin_id: coin_id },
      {
        new: true,
      },
    );

    if (!coin) {
      return res
        .status(404)
        .json({ status: false, message: "No Coin Found", coin: {} });
    }

    // Update the coin properties
    coin.name = name || coin.name;
    coin.symbol = symbol || coin.symbol;
    coin.current_price = current_price || coin.current_price;

    // Save the updated coin
    const updatedCoin = await coin.save();

    res.status(200).json({
      status: true,
      message: "Update coin success",
      coin: updatedCoin,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Update coin failed",
      error: error.message,
    });
  }
};

module.exports = {
  getCoin,
  getCoinById,
  addNewCoin,
  updateCoin,
};
