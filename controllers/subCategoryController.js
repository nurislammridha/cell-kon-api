const express = require("express");
const router = express.Router();
const SubCategory = require("../models/SubCategory");
//@route POST api/admin
//@desc Admin login
//@access Public
const createSubCategory = async (req, res) => {
  const { categoryName, categoryId, subCategoryName, categoryImgUrl, subCategoryImgUrl } = req.body;
  try {
    // let catName = await SubCategory.findOne({ subCategoryName });
    // //see if user exists
    // if (catName) {
    //   return res.status(400).json({ message: "Sub Category already exist" });
    // }
    let subCategory = new SubCategory({ categoryName, categoryId, subCategoryName, categoryImgUrl, subCategoryImgUrl });
    await subCategory.save();
    res.status(200).json({
      message: "Sub Category inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Sub Category
const allSubCategories = async (req, res) => {
  try {
    await SubCategory.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All sub category are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

//Sub Category By ID//
const subCategoryById = async (req, res) => {
  await SubCategory.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Sub Category By Id!",
        status: true,
      });
    }
  });
};
//Sub Category By Category ID//
const subCategoryByCategory = async (req, res) => {
  await SubCategory.find({ categoryId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Sub Category By Category Id!",
        status: true,
      });
    }
  });
};

//Update Sub cateCategory
const updateSubCategory = async (req, res) => {
  await SubCategory.updateOne(
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
          message: "Sub category were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete sub category
const deleteSubCategory = async (req, res) => {
  await SubCategory.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Sub Category was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createSubCategory, allSubCategories, subCategoryById, subCategoryByCategory, updateSubCategory, deleteSubCategory };
