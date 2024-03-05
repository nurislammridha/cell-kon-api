const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    require: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Brand = mongoose.model("Brand", BrandSchema);
