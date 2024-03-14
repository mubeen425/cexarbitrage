const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExchangeSchema = new Schema(
  {
    exchange_id: { type: String },
    exchange_name: { type: String },
    exchange_pair: { type: String },
    exchange_symbol: { type: String },
    exchange_price: { type: Number },
    exchange_deviation_from_mean: { type: Number },
    non_kyc:{ type: String },
    img_url:{ type: String },
    exchange_deposit: { type: Boolean },
    exchange_withdraw: { type: Boolean },
    exchange_image: { type: String },
    exchange_url: { type: String },
    // append_exchage_pair_info: {
    //   type: Boolean,
    //   default: false
    // },
    isEditable: { type: Boolean },
    coins: {
      type: Schema.Types.ObjectId,
      ref: "coin",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("exchange", ExchangeSchema);
