const express = require('express')
const { regiserUser, loginUser, getUserProfile, updateUserProfile, changePassword} = require('../controllers/userController')
const router = express.Router()
const {protect} = require("../middleware/authMiddleware");

router.post("/register", regiserUser)
router.post("/login", loginUser)
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/change-password", protect, changePassword);

module.exports = router