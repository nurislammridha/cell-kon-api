const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createSize, allSize, sizeById, updateSize, deleteSize } = require("../controllers/sizeController");
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(adminAuth, createSize)
router.route('/').get(allSize)
router.route('/:id').get(sizeById)
router.route('/:id').put(adminAuth, updateSize)
router.route('/:id').delete(adminAuth, deleteSize)

module.exports = router;
