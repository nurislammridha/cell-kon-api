const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
//@route POST api/admin
//@desc Admin login
//@access Public
// const getArrId=()=>{
//   arr.forEach(item => {

//   });
// }
router.post("/", async (req, res) => {
  const { buyerId, productInfo } = req.body;
  try {
    let info = await Cart.findOne({ buyerId });
    //see if user exists
    if (info) {
      let productFind = await Cart.findOne({ "productInfo.productId": productInfo[0].productId });
      // let productFind = await Cart.findOne({ buyerId }, { productInfo: { $elemMatch: { productId: productInfo[0].productId } } });
      // console.log('productFind', productFind)
      if (productFind) {
        // await Cart.updateOne({ _id: info?._id, "productInfo.productId": productInfo[0].productId }, { $set: { productInfo: productInfo } });
        await Cart.updateOne(
          { _id: info?._id, "productInfo.productId": productInfo[0].productId },
          {
            $set:
            {
              "productInfo.$.productDetails": productInfo[0].productDetails,
              "productInfo.$.productId": productInfo[0].productId,
              "productInfo.$.quantity": productInfo[0].quantity,
              "productInfo.$.colorName": productInfo[0].colorName,
              "productInfo.$.colorHexCode": productInfo[0].colorHexCode,
              "productInfo.$.sizeName": productInfo[0].sizeName,
              "productInfo.$.productImgUrl": productInfo[0].productImgUrl,
            }
          });
        return res.status(200).json({
          message: "Cart Updated old product",
          status: true,
        });
      } else {
        await Cart.updateOne({ _id: info?._id }, { $push: { productInfo: productInfo } });
        return res.status(200).json({
          message: "Cart created new product",
          status: true,
        });
      }

    } else {
      let cartInfo = new Cart(req.body);
      await cartInfo.save();
      return res.status(200).json({
        message: "Your First create a cart",
        status: true,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//All cart List
router.get("/", async (req, res) => {
  try {
    await Cart.find((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "All Cart are showing!",
          status: true,
        });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// cart By ID//
router.get("/:id", async (req, res) => {
  await Cart.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      let [obj] = data;
      res.status(200).json({
        result: obj,
        message: "Cart by id are showing!",
        status: true,
      });
    }
  });
});
// cart By buyer ID//
router.get("/buyer/:id", async (req, res) => {
  await Cart.find({ buyerId: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      const [obj] = data
      res.status(200).json({
        result: obj,
        message: "Cart data by buyer id are showing!",
        status: true,
      });
    }
  }).populate("productInfo.productDetails");
})
// cart quantity increase decrease 
router.post("/quantity", async (req, res) => {
  const { cartId, productInfoId, number } = req.body;
  try {
    let isCart = await Cart.findOne({ _id: cartId });
    //see if user exists
    if (isCart) {
      let productFind = await Cart.findOne({ "productInfo._id": productInfoId });
      // console.log('productFind', productFind)
      if (productFind) {
        await Cart.updateOne(
          { _id: cartId, "productInfo._id": productInfoId },
          {
            $set:
            {
              "productInfo.$.quantity": number,
            }
          }, (err, data) => {
            if (err) {
              return res.status(200).json({
                message: "Something wrong",
                status: false,
              });
            } else {
              return res.status(200).json({
                result: data,
                message: "Quantity updated",
                status: true,
              });
            }
          });
      } else {
        return res.status(200).json({
          message: "No cart product found",
          status: false,
        });
      }
    } else {
      return res.status(200).json({
        message: "No cart found",
        status: false,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

//Update Category
router.put("/:id", async (req, res) => {
  await Category.updateOne(
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
          message: "Category were updated successfully!",
          status: true,
        });
      }
    }
  );
});

//delete category
router.delete("/:id", async (req, res) => {
  await Category.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Category was deleted successfully!",
        status: true,
      });
    }
  });
});
module.exports = router;
