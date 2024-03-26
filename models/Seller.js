const mongoose = require("mongoose");
const SellerSchema = new mongoose.Schema({
  sellerName: {
    type: String,
    require: true,
  },
  sellerAddress: {
    type: String,
    require: true,
  },
  shopName: {
    type: String,
    require: true,
  },
  deliveryPeriod: {
    type: String,
    require: true,
  },
  sellerRatings: {
    type: Number,
    default: 1,
  },
  shopLogo: {
    url: {
      type: String,
      require: true,
    },
    publicId: {
      type: String,
      require: true,
    }
  },
  sellerPhone: {
    type: String,
    require: true,
  },
  sellerEmail: {
    type: String,
    require: false,
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Seller = mongoose.model("Seller", SellerSchema);
