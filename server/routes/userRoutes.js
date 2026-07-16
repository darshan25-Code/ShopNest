const express = require('express')
const { regiserUser, loginUser, getUserProfile, updateUserProfile, changePassword, getAllUsers,deleteUser,updateUserRole} = require('../controllers/userController')
const router = express.Router()
const {protect,adminOnly} = require("../middleware/authMiddleware");

router.post("/register", regiserUser)
router.post("/login", loginUser)
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/change-password", protect, changePassword);

//admin routes
router.get("/", protect, adminOnly, getAllUsers);

router.delete("/:id", protect, adminOnly, deleteUser);

router.put("/:id/role", protect, adminOnly, updateUserRole);

module.exports = router