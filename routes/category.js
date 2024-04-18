const express = require("express");
const adminAuth = require('../middleware/adminAuthMiddleware')
const { createCategory, allCategories, categoryById, updateCategory, deleteCategory } = require("../controllers/categoryController");
const router = express.Router();
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(adminAuth, createCategory)
router.route('/').get(allCategories)
router.route('/:id').get(categoryById)
router.route('/:id').put(adminAuth, updateCategory)
router.route('/:id').delete(adminAuth, deleteCategory)

module.exports = router;
