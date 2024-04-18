const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

const createCart = async (req, res) => {
  const { buyerId, productInfo } = req.body;
  try {
    let info = await Cart.findOne({ buyerId });
    //see if user exists
    if (info) {
      let productFind = await Cart.findOne({ "productInfo.productId": productInfo[0].productId });
      // let productFind = await Cart.findOne({ buyerId }, { productInfo: { $elemMatch: { productId: productInfo[0].productId } } });
      // console.log('productFind', productFind)
      if (productFind) {
        // await Cart.updateOne({ _id: info?._id, "productInfo.productId": productInfo[0].productId }, { $set: { productInfo: productInfo } });
        await Cart.updateOne(
          { _id: info?._id, "productInfo.productId": productInfo[0].productId },
          {
            $set:
            {
              "productInfo.$.productDetails": productInfo[0].productDetails,
              "productInfo.$.productId": productInfo[0].productId,
              "productInfo.$.quantity": productInfo[0].quantity,
              "productInfo.$.colorName": productInfo[0].colorName,
              "productInfo.$.colorHexCode": productInfo[0].colorHexCode,
              "productInfo.$.sizeName": productInfo[0].sizeName,
              "productInfo.$.productImgUrl": productInfo[0].productImgUrl,
            }
          });
        return res.status(200).json({
          message: "Cart Updated old product",
          status: true,
        });
      } else {
        await Cart.updateOne({ _id: info?._id }, { $push: { productInfo: productInfo } });
        return res.status(200).json({
          message: "Cart created new product",
          status: true,
        });
      }

    } else {
      let cartInfo = new Cart(req.body);
      await cartInfo.save();
      return res.status(200).json({
        message: "Your First create a cart",
        status: true,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//All cart List
const allCarts = async (req, res) => {
  try {
    await Cart.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Cart are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// cart By ID//
const cartById = async (req, res) => {
  await Cart.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Cart by id are showing!",
        status: true,
      });
    }
  });
};
// cart By buyer ID//
const cartByBuyerId = async (req, res) => {
  await Cart.find({ buyerId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      console.log('data', data)
      if (data.length > 0) {
        const [obj] = data
        res.status(200).json({
          result: obj,
          message: "Cart data by buyer id are showing!",
          status: true,
        });
      } else {
        res.status(200).json({
          result: {},
          message: "No cart add yet!",
          status: false,
        });
      }

    }
  }).populate("productInfo.productDetails");
}
// cart quantity increase decrease 
const updateQuantity = async (req, res) => {
  const { cartId, productInfoId, number } = req.body;
  try {
    let isCart = await Cart.findOne({ _id: cartId });
    //see if user exists
    if (isCart) {
      let productFind = await Cart.findOne({ "productInfo._id": productInfoId });
      // console.log('productFind', productFind)
      if (productFind) {
        await Cart.updateOne(
          { _id: cartId, "productInfo._id": productInfoId },
          {
            $set:
            {
              "productInfo.$.quantity": number,
            }
          }, (err, data) => {
            if (err) {
              return res.status(200).json({
                message: "Something wrong",
                status: false,
              });
            } else {
              return res.status(200).json({
                result: data,
                message: "Quantity updated",
                status: true,
              });
            }
          });
      } else {
        return res.status(200).json({
          message: "No cart product found",
          status: false,
        });
      }
    } else {
      return res.status(200).json({
        message: "No cart found",
        status: false,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

//remove multiple items of cart
const deleteManyCart = async (req, res) => {
  const { cartId, productsArrId } = req.body
  try {
    // {"$pull":{"group_members":{"faculty_number":{$in:[8025,7323]}}}}
    await Cart.updateOne({ _id: cartId }, { $pull: { productInfo: { _id: { $in: productsArrId } } } });
    return res.status(200).json({
      message: "Removed products from cart!",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Update Cart
const updateCart = async (req, res) => {
  await Cart.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Cart were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete cart
const deleteCart = async (req, res) => {
  await Category.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Category was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createCart, allCarts, cartById, updateQuantity, updateCart, deleteCart, deleteManyCart, cartByBuyerId };
