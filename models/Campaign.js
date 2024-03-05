const mongoose = require("mongoose");
const CampaignSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    require: true,
  },
  campaignStartTime: {
    type: String,
    require: true,
  },
  campaignStartDate: {
    type: String,
    require: true,
  },
  campaignEndTime: {
    type: String,
    require: true,
  },
  campaignEndDate: {
    type: String,
    require: true,
  },
  campaignProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  }],
  soldProducts: [{
    productsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products"
    },
    quantity: {
      type: Number,
      require: true,
    },
    sellPrice: {
      type: String,
      require: true,
    },
    sellingTimeRp: {
      type: String,
      require: true,
    },
  }
  ],
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Campaign = mongoose.model("Campaign", CampaignSchema);
