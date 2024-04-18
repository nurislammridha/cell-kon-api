const express = require("express");
const { adminLogin } = require("../controllers/adminController");
const router = express.Router();

router.route('/').post(adminLogin)

module.exports = router