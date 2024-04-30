const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Seller = require("../models/Seller");
const Category = require("../models/Category");
//@route POST api/admin
//@desc Admin login
//@access Public

const createProduct = async (req, res) => {
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
};
//all Products ;ist
const allProducts = async (req, res) => {
  try {
    const search = req.query.search || ""
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const searchRegExp = new RegExp('.*' + search + '.*', 'i')
    const filter = {
      $or: [
        { productName: { $regex: searchRegExp } },
        { categoryName: { $regex: searchRegExp } },
        { brandName: { $regex: searchRegExp } },
        { sellerName: { $regex: searchRegExp } }
      ]
    }
    const products = await Product.find(filter).sort({ _id: -1 }).limit(limit).skip((page - 1) * limit)
    const count = await Product.find(filter).countDocuments()

    if (!products) {
      res.status(200).json({
        result: [],
        message: "No data found",
        status: true,
      });
    }

    res.status(200).json({
      result: {
        products,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        }
      },
      message: "All products list are showing!",
      status: true,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
//all Products by filter shop and categories
const allProductsByShopsAndCategories = async (req, res) => {
  //short low to high 1// high to low -1
  const { categoriesId, sellersId = [], brandsId, isShortBy, short, search = "", page: pageNumber, limit: limitNumber } = req.body || {}
  // console.log('req.body', req.body)
  // const filteredProducts= productModel.find({ categories:{$in:categories}  })
  //  isShortBy === true then sort 0, low to high -1, high to low 1
  const page = Number(pageNumber) || 1
  const limit = Number(limitNumber) || 5
  const searchRegExp = new RegExp('.*' + search + '.*', 'i')
  const filter = {
    $or: [
      { productName: { $regex: searchRegExp } },
      { categoryName: { $regex: searchRegExp } },
      { brandName: { $regex: searchRegExp } },
      { sellerName: { $regex: searchRegExp } },
      // { categoryId: { $in: categoriesId } },
      // { sellerId: { $in: sellersId } }
    ]
  }
  let sortObj = {}
  if (isShortBy) {
    sortObj = { mrp: short }
  } else {
    sortObj = { _id: -1 }
  }
  try {
    let pro = []
    let count = 0
    if (sellersId.length > 0) {
      // shop wise filter
      if (categoriesId.length > 0 && brandsId.length > 0) {
        pro = await Product.find(filter).where("sellerId").in(sellersId).where("categoryId").in(categoriesId).where("brandId").in(brandsId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("sellerId").in(sellersId).where("categoryId").in(categoriesId).where("brandId").in(brandsId).countDocuments()
      } else if (categoriesId.length > 0) {
        pro = await Product.find(filter).where("sellerId").in(sellersId).where("categoryId").in(categoriesId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("sellerId").in(sellersId).where("categoryId").in(categoriesId).countDocuments()
      } else if (brandsId.length > 0) {
        pro = await Product.find(filter).where("sellerId").in(sellersId).where("brandId").in(brandsId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("brandId").in(brandsId).countDocuments()
      } else if (categoriesId.length === 0 && brandsId.length === 0) {
        pro = await Product.find(filter).where("sellerId").in(sellersId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("sellerId").in(sellersId).populate('sellerInfo').countDocuments()
      }

    } else {
      //not shop page
      if (categoriesId.length > 0 && brandsId.length > 0) {
        pro = await Product.find(filter).where("categoryId").in(categoriesId).where("brandId").in(brandsId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("categoryId").in(categoriesId).where("brandId").in(brandsId).countDocuments()
      } else if (categoriesId.length > 0) {
        pro = await Product.find(filter).where("categoryId").in(categoriesId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("categoryId").in(categoriesId).countDocuments()
      } else if (brandsId.length > 0) {
        pro = await Product.find(filter).where("brandId").in(brandsId).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).where("brandId").in(brandsId).countDocuments()
      } else if (categoriesId.length === 0 && brandsId.length === 0) {
        pro = await Product.find(filter).populate('sellerInfo').sort(sortObj).limit(limit).skip((page - 1) * limit)
        count = await Product.find(filter).populate('sellerInfo').countDocuments()
      }
    }

    // pro = await Product.find(filter).where("categoryId").in(categoriesId).populate('sellerInfo').sort(sortObj)
    // console.log('pro', pro)
    if (pro) {
      res.status(200).json({
        result: {
          products: pro,
          pagination: {
            totalPage: Math.ceil(count / limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page - 1 : null,
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
          }
        },
        message: "All products filter list are showing!",
        status: true,
      });
    }
  } catch (error) {
    console.log('error', error)
    res.status(500).send("Server error");
  }
};
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
const homepageProducts = async (req, res) => {
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
};

// Product By ID//
const productById = async (req, res) => {
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
};
// Product By subCategory id ID//
const productBySubcategory = async (req, res) => {
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
};

//Update Product
const updateProduct = async (req, res) => {
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
};

//delete Product
const deleteProduct = async (req, res) => {
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
};
module.exports = { createProduct, allProducts, productById, productBySubcategory, allProductsByShopsAndCategories, updateProduct, deleteProduct, homepageProducts };
