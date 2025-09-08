const router = require("express").Router()
const { login, logout, refreshToken } = require("../controllers/auth.controller")

router.post("/login", login)
router.post("/logout", logout)
router.post("/refresh", refreshToken)

module.exports = router