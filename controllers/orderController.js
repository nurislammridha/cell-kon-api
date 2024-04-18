const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
//@route POST api/admin
//@desc Admin login
const createOrder = async (req, res) => {
  // const {} = req.body;
  try {
    let ordar = new Order(req.body);
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
