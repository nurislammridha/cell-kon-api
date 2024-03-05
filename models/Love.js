const mongoose = require("mongoose");
const LoveSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    require: true,
  },
  buyerId: {
    type: String,
    require: true,
  },
  productInfo: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products"
    },
  }],
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Love = mongoose.model("Love", LoveSchema);
