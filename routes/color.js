const express = require("express");
const router = express.Router();
const Color = require("../models/Color");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  const { colorName, colorHexCode } = req.body;
  try {
    let coName = await Color.findOne({ colorName });
    let code = await Color.findOne({ colorHexCode });
    console.log('coName,code', coName, code)
    //see if color or code exists
    if (coName) {
      return res.status(400).json({ message: "Color Name already exist" });
    } else if (code) {
      return res.status(400).json({ message: "Color Code already exist" });
    }
    let color = new Color({ colorName, colorHexCode });
    await color.save();
    res.status(200).json({
      message: "Color inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all Color
router.get("/", async (req, res) => {
  try {
    await Color.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All color are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Color By ID//
router.get("/:id", async (req, res) => {
  await Color.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Color by Id!",
        status: true,
      });
    }
  });
});

//Update Color
router.put("/:id", async (req, res) => {
  await Color.updateOne(
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
          message: "Color were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete color
router.delete("/:id", async (req, res) => {
  await Color.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Color was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
