const express = require("express");
const Campaign = require("../models/Campaign");
const Product = require("../models/Product");

const createCampaign = async (req, res) => {
  try {
    let camp = new Campaign(req.body);
    await camp.save();
    res.status(200).json({
      message: "Campaign created successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//Add multiple products
const multipleUpdate = (arr, camId) => {
  arr.forEach(({ productId, campaignPrice }) => {
    const post = { campaignDiscount: parseInt(campaignPrice), campaign: camId, campaignId: camId, isCampaign: true }
    Product.updateOne({ _id: productId }, {
      $set: post
    }, (err, data) => {
      if (err) {
        console.log('err', err)
      } else {
        console.log('data', data)
      }
    })
  });

}
const addCampaignProducts = async (req, res) => {
  // productId: item._id, campaignPrice: 0
  const camId = req.params.id
  const products = req?.body
  try {
    multipleUpdate(products, camId)
    // await Campaign.updateOne({ _id: id }, { $push: { campaignProducts: req.body } });
    return res.status(200).json({
      message: "Added product in campaign successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//single product remove
const removeCampaignProduct = async (req, res) => {
  const proId = req.params.id
  try {
    await Product.updateOne({ _id: proId }, { $set: { campaignDiscount: 0, campaignId: "", isCampaign: false } });
    return res.status(200).json({
      message: "Remove product in campaign successfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//All cart List
const allCampaigns = async (req, res) => {
  try {
    await Campaign.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Campaign are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// campaign By ID//
const campaignById = async (req, res) => {
  campId = req.params.id
  await Campaign.find({ _id: campId }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      Product.find({ campaignId: campId }, (err, data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          // console.log('data', data)
          const result = { ...obj._doc, products: data }
          res.status(200).json({
            result: result,
            message: "Campaign products by id are showing!",
            status: true,
          });
        }
      })

    }
  })
  // .populate({
  //   path: 'campaignProducts',
  //   populate: {
  //     path: 'product',
  //     model: 'Product'
  //   }
  // });
};

//Update Campaign
const updateCampaign = async (req, res) => {
  await Campaign.updateOne(
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
          message: "Campaign were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete campaign
const deleteCampaign = async (req, res) => {
  await Campaign.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Campaign was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createCampaign, allCampaigns, campaignById, updateCampaign, deleteCampaign, addCampaignProducts, removeCampaignProduct };
