const express = require("express");
const router = express.Router();
const buyerAuth = require('../middleware/buyerAuthMiddleware');
const adminAuth = require('../middleware/adminAuthMiddleware');
const { createCampaign, allCampaigns, campaignById, updateCampaign, deleteCampaign, addCampaignProducts, removeCampaignProduct } = require("../controllers/campaignController");

router.route('/').post(adminAuth, createCampaign)
router.route('/').get(allCampaigns)
router.route('/add-products/:id').post(addCampaignProducts)
router.route('/remove-product/:id').delete(removeCampaignProduct)
router.route('/:id').get(campaignById)
router.route('/:id').put(adminAuth, updateCampaign)
router.route('/:id').delete(adminAuth, deleteCampaign)
module.exports = router;
