const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware')
const { createColor, allColors, colorById, updateColor, deleteColor } = require("../controllers/colorController");
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(adminAuth, createColor)
router.route('/').get(allColors)
router.route('/:id').get(colorById)
router.route('/:id').put(adminAuth, updateColor)
router.route('/:id').delete(adminAuth, deleteColor)

module.exports = router;
