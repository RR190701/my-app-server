//A private route that will be only
const express = require('express');
const router =  express.Router();
const {getPrivateData, updateProfile, deleteFeild} = require('../controllers/profile')
const { protect } = require('../middleware/privateAuth')



router.route("/profile/:id").get(protect, getPrivateData);

router.route("/updateProfile").put(protect, updateProfile)

router.route("/deleteFeild").put(protect, deleteFeild)


module.exports = router;