const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  rp: {
    type: Number,
    require: true,
  },
  mrp: {
    type: Number,
    require: true,
  },
  regularDiscount: {
    type: Number,
    require: true,
  },
  campaignDiscount: {
    type: Number,
    require: true,
  },
  unitName: {
    type: String,
    require: true,
  },
  unitId: {
    type: String,
    require: true,
  },
  colorName: {
    type: String,
    require: true,
  },
  colorId: {
    type: String,
    require: true,
  },
  sizeName: {
    type: String,
    require: true,
  },
  sizeId: {
    type: String,
    require: true,
  },
  categoryName: {
    type: String,
    require: true,
  },
  categoryId: {
    type: String,
    require: true,
  },
  subCategoryName: {
    type: String,
    require: true,
  },
  subCategoryId: {
    type: String,
    require: true,
  },
  brandName: {
    type: String,
    require: true,
  },
  brandId: {
    type: String,
    require: true,
  },
  sellerName: {
    type: String,
    require: true,
  },
  sellerId: {
    type: String,
    require: true,
  },
  sellerRatings: {
    type: Number,
    require: true,
  },
  commentsInfo: [{
    userName: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
  }],
  availableQuantity: {
    type: Number,
    require: true,
  },
  isCampaign: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isTrending: {
    type: Boolean,
    default: true,
  },
  viewCount: {
    type: Number,
    require: true,
  },
  shortDescriptions: {
    type: String,
    require: true,
  },
  longDescriptions: {
    type: String,
    require: true,
  },
  productImgUrl: [{
    type: String,
    require: true,
  }],
  productIconUrl: {
    type: String,
    require: true,
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  }],
  isAvailableCashOnDelivery: {
    type: Boolean,
    default: true
  }
});
module.exports = Product = mongoose.model("Product", ProductSchema);
