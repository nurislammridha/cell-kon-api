const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { createProduct, allProducts, allProductsByShopsAndCategories, homepageProducts, productById, productBySubcategory, updateProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(adminAuth, createProduct)
router.route('/').get(allProducts)
router.route('/filter').post(allProductsByShopsAndCategories)
router.route('/home-page').get(homepageProducts)
router.route('/:id').get(productById)
router.route('/sub-category-id/:id').get(productBySubcategory)
router.route('/:id').put(adminAuth, updateProduct)
router.route('/:id').delete(adminAuth, deleteProduct)

module.exports = router;
