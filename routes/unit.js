const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createUnit, allUnits, unitById, updateUnit, deleteUnit } = require("../controllers/unitController");
//@route POST api/admin
//@desc Admin login
//@access Public
router.route('/').post(adminAuth, createUnit)
router.route('/').get(allUnits)
router.route('/:id').get(unitById)
router.route('/:id').put(adminAuth, updateUnit)
router.route('/:id').delete(adminAuth, deleteUnit)

module.exports = router;
