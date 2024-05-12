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
  isShowHomePage: {
    type: Boolean,
    require: false,
    default: false
  },
  campaignProducts: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    productId: {
      type: String,
      require: true
    },
    campaignPrice: {
      type: Number,
      require: true
    }
  }],
  soldProducts: [{
    productsId: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      ref: "Product"
    },
    quantity: {
      type: Number,
      require: false,
    },
    sellPrice: {
      type: String,
      require: false,
    },
    sellingTimeRp: {
      type: String,
      require: false,
    },
  }
  ],
  isActive: {
    type: String,
    default: true,
  },
}, { timestamps: true });
module.exports = Campaign = mongoose.model("Campaign", CampaignSchema);
