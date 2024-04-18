const express = require("express");
const router = express.Router();
const buyerAuth = require('../middleware/buyerAuthMiddleware')
const { createCart, allCarts, cartById, cartByBuyerId, updateQuantity, deleteManyCart, updateCart, deleteCart } = require("../controllers/cartController");

router.route('/').post(buyerAuth, createCart)
router.route('/').get(buyerAuth, allCarts)
router.route('/:id').get(buyerAuth, cartById)
router.route('/buyer/:id').get(buyerAuth, cartByBuyerId)
router.route('/quantity').post(buyerAuth, updateQuantity)
router.route('/delete-many').post(buyerAuth, deleteManyCart)
router.route('/:id').put(buyerAuth, updateCart)
router.route('/:id').delete(buyerAuth, deleteCart)
module.exports = router;
