const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
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
    quantity: {
      type: Number,
      require: true
    },
    colorId: {
      type: String,
      require: true
    },
    sizeId: {
      type: String,
      require: true
    },
  }],
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Cart = mongoose.model("Cart", CartSchema);
