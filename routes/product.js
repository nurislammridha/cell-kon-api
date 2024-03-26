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
//all Products ;ist
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
//all Products by filter shop and categories
router.post("/filter", async (req, res) => {
  //short low to high 1// high to low -1
  const { categoriesId, sellersId, isShortBy, short } = req.body
  // console.log('req.body', req.body)
  // const filteredProducts= productModel.find({ categories:{$in:categories}  })
  try {
    let pro = []
    if (categoriesId.length > 0 && sellersId.length > 0) {
      !isShortBy ? pro = await Product.find({ categoryId: { $in: categoriesId }, sellerId: { $in: sellersId } }) :
        pro = await Product.find({ categoryId: { $in: categoriesId }, sellerId: { $in: sellersId } }).sort({ mrp: short })
    } else if (categoriesId.length > 0) {
      !isShortBy ? pro = await Product.find({ categoryId: { $in: categoriesId } }) :
        pro = await Product.find({ categoryId: { $in: categoriesId } }).sort({ mrp: short })
    } else if (sellersId.length > 0) {
      !isShortBy ? pro = await Product.find({ sellerId: { $in: sellersId } }) :
        pro = await Product.find({ sellerId: { $in: sellersId } }).sort({ mrp: short })
    } else if (categoriesId.length === 0 && sellersId.length === 0) {
      !isShortBy ? pro = await Product.find() :
        pro = await Product.find().sort({ mrp: short })
    }
    console.log('pro', pro)
    if (pro) {
      res.status(200).json({
        result: pro,
        message: "All products filter list are showing!",
        status: true,
      });
    }
  } catch (error) {
    console.log('error', error)
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
    let sellKonMallProducts = await Product.find({ sellerId: "6602d7dfdf403e1264fffccc" });
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
  }).populate('relatedProducts.value').populate('sellerInfo');
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
