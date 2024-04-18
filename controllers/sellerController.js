const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
//@route POST api/admin
//@desc Admin login
//@access Public
const createSeller = async (req, res) => {
  const { sellerName, sellerAddress, shopName, deliveryPeriod, shopLogo, sellerPhone, sellerEmail } = req.body;
  try {
    let selPhone = await Seller.findOne({ sellerPhone });
    //see if user exists
    if (selPhone) {
      return res.status(400).json({ message: "Seller already exist with these phone number." });
    }
    let seller = new Seller({ sellerName, sellerAddress, shopName, deliveryPeriod, shopLogo, sellerPhone, sellerEmail });
    await seller.save();
    res.status(200).json({
      message: "Seller inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Seller
const allSellers = async (req, res) => {
  try {
    await Seller.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All seller are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Seller By ID//
const sellerById = async (req, res) => {
  await Seller.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "All seller by id!",
        status: true,
      });
    }
  });
};

//Update Seller
const updateSeller = async (req, res) => {
  await Seller.updateOne(
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
          message: "Seller were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete seller
const deleteSeller = async (req, res) => {
  await Seller.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Seller was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createSeller, allSellers, updateSeller, deleteSeller, sellerById };
