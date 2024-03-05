const express = require("express");
const router = express.Router();
const Unit = require("../models/Unit");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  const { unitName } = req.body;
  try {
    let uniName = await Unit.findOne({ unitName });
    //see if unit exists
    if (uniName) {
      return res.status(400).json({ message: "Thus unit already exist" });
    }
    let unit = new Unit({ unitName });
    await unit.save();
    res.status(200).json({
      message: "Unit inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all Unit
router.get("/", async (req, res) => {
  try {
    await Unit.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All unit list!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// unit By ID//
router.get("/:id", async (req, res) => {
  await Unit.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Unit list by id!",
        status: true,
      });
    }
  });
});

//Update Unit
router.put("/:id", async (req, res) => {
  await Unit.updateOne(
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
          message: "Unit were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete unit
router.delete("/:id", async (req, res) => {
  await Unit.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Unit was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
