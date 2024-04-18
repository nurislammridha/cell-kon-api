const Brand = require("../models/Brand");
//@route POST api/admin
//@desc Admin login
//@access Public
const createBrand = async (req, res) => {
  const { brandName, isActive } = req.body;
  try {
    let braName = await Brand.findOne({ brandName });
    //see if user exists
    if (braName) {
      return res.status(400).json({ message: "Brand already exist" });
    }
    let brand = new Brand({ brandName });
    await brand.save();
    res.status(200).json({
      message: "Brand inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//all Brand
const allBrands = async (req, res) => {
  try {
    await Brand.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Brands are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Brand By ID//
const brandById = async (req, res) => {
  await Brand.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Brand list by brand id!",
        status: true,
      });
    }
  });
};

//Update Brand
const updateBrand = async (req, res) => {
  await Brand.updateOne(
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
          message: "Brand were updated successfully!",
          status: true,
        });
      }
    }
  );
};

//delete category
const deleteBrand = async (req, res) => {
  await Brand.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Brand was deleted successfully!",
        status: true,
      });
    }
  });
};
module.exports = { createBrand, allBrands, brandById, updateBrand, deleteBrand };
