const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware')
const { createSeller, allSellers, sellerById, updateSeller, deleteSeller } = require("../controllers/sellerController");
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(adminAuth, createSeller)
router.route('/').get(allSellers)
router.route('/:id').get(sellerById)
router.route('/:id').put(adminAuth, updateSeller)
router.route('/:id').delete(adminAuth, deleteSeller)

module.exports = router;
