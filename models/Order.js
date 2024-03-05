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
    ref: "products"
  },
  productInfo: [{
    products: {
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
    sellPrice: {
      type: String,
      require: true
    },
    pastRp: {
      type: String,
      require: true
    },
  }],
  orderStatus: {
    type: String,
    require: true,
  },
  orderDate: {
    type: String,
    require: true,
  },
  deliveryAddress: {
    type: String,
    require: true,
  },
  receiverPhone: {
    type: String,
    require: true,
  },
  deliveryDate: {
    type: String,
    require: true,
  },
  isCreated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    require: true,
  },
  isConfirm: {
    type: Boolean,
    default: false,
  },
  confirmedAt: {
    type: String,
    require: true,
  },
  isProcessing: {
    type: Boolean,
    default: false,
  },
  processedAt: {
    type: String,
    require: true,
  },
  isPicked: {
    type: Boolean,
    default: false,
  },
  pickedAt: {
    type: String,
    require: true,
  },
  isShipped: {
    type: Boolean,
    default: false,
  },
  shippedAt: {
    type: String,
    require: true,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: String,
    require: true,
  },
  isCancel: {
    type: Boolean,
    default: false,
  },
  cancelAt: {
    type: String,
    require: true,
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
  isActive: {
    type: String,
    default: true,
  },
});
module.exports = Order = mongoose.model("Order", OrderSchema);
