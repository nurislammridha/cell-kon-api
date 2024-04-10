const express = require("express");
const { createBuyer, buyerLogin, deliveryAddress, updateDeliveryAddress, allBuyerList, allBuyerById, updateBuyer, deleteBuyer } = require("../controllers/buyerController");
const buyerAuth = require('../middleware/buyerAuthMiddleware')
const router = express.Router();

router.route('/').post(createBuyer)
router.route('/login').post(buyerLogin)
router.route('/delivery-address').post(buyerAuth, deliveryAddress)
router.route('/update-delivery-address').put(buyerAuth, updateDeliveryAddress)
router.route('/').get(allBuyerList)
router.route('/:id').get(buyerAuth, allBuyerById)
router.route('/:id').put(buyerAuth, updateBuyer)
router.route('/:id').delete(deleteBuyer)

module.exports = router