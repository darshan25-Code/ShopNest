const express = require('express')
const { regiserUser, loginUser } = require('../controllers/userController')
const router = express.Router()

router.post("/register", regiserUser)
router.post("/login", loginUser)

module.exports = router