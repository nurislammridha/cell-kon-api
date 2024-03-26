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
  size: [
    {
      label: {
        type: String,
        require: true,
      },
      value: {
        type: String,
        require: true,
      },
    }
  ],
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
  sellerInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Seller'
  },
  sellerRatings: {
    type: Number,
    require: true,
  },
  commentsInfo: [{
    userName: {
      type: String,
      require: false,
    },
    userId: {
      type: String,
      require: false,
    },
    comment: {
      type: String,
      require: false,
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
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  shortDescriptions: {
    type: String,
    require: true,
  },
  longDescriptions: {
    type: String,
    require: true,
  },
  productImgColor: [
    {
      colorName: {
        type: String,
        require: true,
      },
      colorId: {
        type: String,
        require: true,
      },
      colorHexCode: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
      publicId: {
        type: String,
        require: true,
      }
    }
  ],
  productIcon: {
    url: {
      type: String,
      require: true,
    },
    publicId: {
      type: String,
      require: true,
    }
  },
  relatedProducts: [{
    label: {
      type: String,
      require: true,
    },
    value: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  }],
  isAvailableCashOnDelivery: {
    type: Boolean,
    default: true
  }
});
module.exports = Product = mongoose.model("Product", ProductSchema);
