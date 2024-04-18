const express = require("express");
const { createBrand, allBrands, brandById, updateBrand, deleteBrand } = require("../controllers/brandController");
const adminAuth = require('../middleware/adminAuthMiddleware')
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(adminAuth, createBrand)
router.route('/').get(allBrands)
router.route('/:id').get(brandById)
router.route('/:id').put(adminAuth, updateBrand)
router.route('/:id').delete(adminAuth, deleteBrand)
module.exports = router
