const express = require("express");
const router = express.Router();
const Size = require("../models/Size");
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/", async (req, res) => {
  const { sizeName } = req.body;
  try {
    let siName = await Size.findOne({ sizeName });
    //see if size exists
    if (siName) {
      return res.status(400).json({ message: "Size already exist" });
    }
    let size = new Size({ sizeName });
    await size.save();
    res.status(200).json({
      message: "Size inserted succesfully",
      status: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//all Size
router.get("/", async (req, res) => {
  try {
    await Size.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All size lists are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Size By ID//
router.get("/:id", async (req, res) => {
  await Size.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Size list by id!",
        status: true,
      });
    }
  });
});

//Update Size
router.put("/:id", async (req, res) => {
  await Size.updateOne(
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
          message: "Size were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete size
router.delete("/:id", async (req, res) => {
  await Size.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Size was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
