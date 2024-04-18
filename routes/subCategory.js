const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createSubCategory, allSubCategories, subCategoryById, subCategoryByCategory, updateSubCategory, deleteSubCategory } = require("../controllers/subCategoryController");

router.route('/').post(adminAuth, createSubCategory)
router.route('/').get(allSubCategories)
router.route('/:id').get(subCategoryById)
router.route('/by-category/:id').get(adminAuth, subCategoryByCategory)
router.route('/:id').put(adminAuth, updateSubCategory)
router.route('/:id').delete(adminAuth, deleteSubCategory)

module.exports = router;
