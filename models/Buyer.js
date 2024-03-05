const mongoose = require("mongoose");
const BuyerSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    require: false,
  },
  buyerPhone: {
    type: String,
    require: false,
  },
  buyerEmail: {
    type: String,
    require: false,
  },
  addressInfo: [{
    division: {
      type: String,
      require: false,
    },
    district: {
      type: String,
      require: false,
    },
    subDistrict: {
      type: String,
      require: false,
    },
    nearestArea: {
      type: String,
      require: false,
    },
    union: {
      type: String,
      require: false,
    },
    house: {
      type: String,
      require: false,
    },
    street: {
      type: String,
      require: false,
    },
    postalCode: {
      type: String,
      require: false,
    },
    detailsAddress: {
      type: String,
      require: false,
    },
  }],
  password: {
    type: String,
    require: [true, 'Please add a password'],
  },

});
module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);
