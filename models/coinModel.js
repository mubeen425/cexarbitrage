const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoinSchema = new Schema(
  {
    coin_id: { type: String },
    name: { type: String },
    symbol: { type: String },
    current_price: { type: String },
    image: { type: String },
    isEditable: { type: Boolean },
    exchange_id: {
      type: Schema.Types.ObjectId,
      ref: "exchange",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("coin", CoinSchema);
