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
    buyerName: {
      type: String,
      require: false,
    },
    buyerPhone: {
      type: String,
      require: false,
    },
    division: {
      type: String,
      require: false,
    },
    district: {
      type: String,
      require: false,
    },
    upazilla: {
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
    postalCode: {
      type: String,
      require: false,
    },
    detailsAddress: {
      type: String,
      require: false,
    },
    isMetropolitan: {
      type: Boolean,
      require: false,
    },
  }],
  password: {
    type: String,
    require: false,
  },

});
module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);
