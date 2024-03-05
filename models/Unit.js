const mongoose = require("mongoose");
const SellerSchema = new mongoose.Schema({
  unitName: {
    type: String,
    require: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Seller = mongoose.model("Seller", SellerSchema);
