const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2
//@route POST api/admin
//@desc Admin login
//@access Public
router.post("/delete-cloudinary", async (req, res) => {
  const { publicId } = req.body;
  try {
    cloudinary.config({
      cloud_name: 'nurislammridha',
      api_key: '867786851463999',
      api_secret: 'CqPj1pr6nHsFnxxySMS9IuA2-VU',
      secure: true
    });
    console.log('publicId', publicId)
    cloudinary.uploader.destroy(publicId).then((res1) => {
      //  res.status ==='ok'
      // console.log('res', res1)
      res.status(200).json({
        message: "Removed",
        status: true,
      });
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
