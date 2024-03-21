const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Seller = require("../models/Seller");
const Category = require("../models/Category");
//@route POST api/admin
//@desc Admin login
//@access Public

router.post("/", async (req, res) => {
  const { productName } = req.body;
  try {

    let product = new Product(req.body);
    await product.save();
    res.status(200).json({
      message: "Product inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all Product
router.get("/", async (req, res) => {
  try {
    await Product.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All products list are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
//all Products for home page
// helper code
// db.collection.find({
//   $or: [
//     { age: { $gt: 13, $lt: 27 } },
//     { age: null },
//     { age: { $exists: false } }
//   ]
// })
//most recent
//const mostRecentRecord = await db.collection.findOne().sort({ _id: -1 });
router.get("/home-page", async (req, res) => {
  try {
    let sellKonMallProducts = await Product.find({ sellerId: "65f92c259171ac3e404a03b2" });
    let trendingProducts = await Product.find({ isTrending: true });
    let popularProducts = await Product.find().sort({ viewCount: -1 }).limit(15);
    let shopsList = await Seller.find();
    let categoriesList = await Category.find();
    await Product.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: { data, sellKonMallProducts, trendingProducts, popularProducts, shopsList, categoriesList },
          message: "All products list are showing!",
          status: true,
        });
      }
    }).sort({ _id: -1 }).limit(15);

    // await Product.find((err, data) => {
    //   if (err) {
    //     res.status(500).json({
    //       error: "There was a server side error!",
    //     });
    //   } else {
    //     res.status(200).json({
    //       result: data,
    //       message: "All products list are showing!",
    //       status: true,
    //     });
    //   }
    // });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Product By ID//
router.get("/:id", async (req, res) => {
  await Product.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Product By Id!",
        status: true,
      });
    }
  }).populate('relatedProducts.value').populate('sellerId');
});
// Product By subCategory id ID//
router.get("/sub-category-id/:id", async (req, res) => {
  await Product.find({ subCategoryId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Product By Subcategory Id!",
        status: true,
      });
    }
  });
});

//Update Product
router.put("/:id", async (req, res) => {
  await Product.updateOne(
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
          message: "Product were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete Product
router.delete("/:id", async (req, res) => {
  await Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Product was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
