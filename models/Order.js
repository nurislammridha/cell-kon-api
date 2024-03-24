const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    require: true,
  },
  buyerId: {
    type: String,
    require: true,
  },
  buyerInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer"
  },
  productInfo: [{
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    productId: {
      type: String,
      require: false
    },
    quantity: {
      type: Number,
      require: true
    },
    colorName: {
      type: String,
      require: false
    },
    sizeName: {
      type: String,
      require: false
    },
    sellPrice: {
      type: String,
      require: false
    },
    pastRp: {
      type: String,
      require: false
    },
  }],
  orderStatus: {
    type: String,
    require: false,
  },
  deliveryAddressInfo: {
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
  },
  deliveryDate: {
    type: String,
    require: false,
  },
  isCreated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    require: false,
  },
  isConfirm: {
    type: Boolean,
    default: false,
  },
  confirmedAt: {
    type: String,
    require: false,
  },
  isProcessing: {
    type: Boolean,
    default: false,
  },
  processedAt: {
    type: String,
    require: false,
  },
  isPicked: {
    type: Boolean,
    default: false,
  },
  pickedAt: {
    type: String,
    require: false,
  },
  isShipped: {
    type: Boolean,
    default: false,
  },
  shippedAt: {
    type: String,
    require: false,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: String,
    require: false,
  },
  isCancel: {
    type: Boolean,
    default: false,
  },
  cancelAt: {
    type: String,
    require: false,
  },
  cancelReason: {
    type: String,
    require: false,
  },
  isCancelByAdmin: {
    type: Boolean,
    default: false,
  },
  paymentAmount: {
    type: String,
    require: false,
  },
  isFullPaid: {
    type: Boolean,
    default: false,
  },
  paymentMethodName: {
    type: String,
    require: false,
  },
  paymentMethodId: {
    type: String,
    require: false,
  },
  txnId: {
    type: String,
    require: false,
  },
  subTotal: {
    type: Number,
    require: false,
  },
  shippingFee: {
    type: Number,
    require: false,
  },
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Order = mongoose.model("Order", OrderSchema);
