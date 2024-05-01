const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { conTwoDigitString } = require("../utils/service/globalFunction");
//@route POST api/admin
//@desc Admin login

const createOrder = async (req, res) => {
  // const {} = req.body;
  try {
    const date = new Date()
    let orderId = "SK"
    orderId += date.getFullYear().toString().substring(2, 4)
    orderId += conTwoDigitString(date.getMonth() + 1)
    orderId += conTwoDigitString(date.getDate())
    orderId += conTwoDigitString(date.getHours())
    orderId += conTwoDigitString(date.getMinutes())
    orderId += conTwoDigitString(date.getSeconds())
    orderId += conTwoDigitString(date.getMilliseconds()).substring(1, 3)
    // console.log('orderId', orderId)
    const payload = { ...req.body, orderId }
    let ordar = new Order(payload);
    await ordar.save();
    res.status(200).json({
      message: "Order Created Successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Order
const allOrders = async (req, res) => {
  try {
    await Order.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All order are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};


// Order By Status//
const orderByStatus = async (req, res) => {
  // console.log('req.query.orderStatus', req.query.orderStatus)
  await Order.find({ orderStatus: req.query.orderStatus }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Order by status are showing!",
        status: true,
      });
    }
  });
};
// Order By Buyer//
const orderByBuyer = async (req, res) => {
  await Order.find({ buyerId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Order by buyer are showing!",
        status: true,
      });
    }
  });
};
// Order By ID//
const orderDetails = async (req, res) => {
  try {
    await Order.find({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        let [obj] = data;
        res.status(200).json({
          result: obj,
          message: "Order by id are showing!",
          status: true,
        });
      }
    }).populate('buyerInfo').populate('productInfo.products');
  } catch (error) {
    res.status(500).send("Server error");
  }

};
//Update Order
const updateOrder = async (req, res) => {
  await Order.updateOne(
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
          message: "Order were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete order
const deleteOrder = async (req, res) => {
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
module.exports = { createOrder, allOrders, orderByBuyer, orderByStatus, orderDetails, updateOrder, deleteOrder };
