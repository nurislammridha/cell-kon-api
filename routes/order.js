const express = require("express");
const router = express.Router();
const buyerAuth = require('../middleware/buyerAuthMiddleware')
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createOrder, allOrders, orderByStatus, orderByBuyer, orderDetails, updateOrder, deleteOrder } = require("../controllers/orderController");
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(buyerAuth, createOrder)
router.route('/').get(adminAuth, allOrders)
router.route('/order-status').get(adminAuth, orderByStatus)
router.route('/buyer/:id').get(buyerAuth, orderByBuyer)
router.route('/order-details/:id').get(orderDetails)
router.route('/:id').put(adminAuth, updateOrder)
router.route('/:id').delete(adminAuth, deleteOrder)

module.exports = router;
