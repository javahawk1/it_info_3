const router = require("express").Router()
const { adminGuard } = require("../middlewares/admin.middleware")
const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require("../controllers/user.controller")
const { loginUser, logoutUser, refreshAccessToken } = require("../controllers/user.auth")
const userGuard = require("../middlewares/user.middleware")

router.post("/login", loginUser)
router.post("/logout", userGuard, logoutUser)
router.post("/refreshToken", refreshAccessToken)

router.get("/", adminGuard, getAllUsers)       
router.get("/:id", userGuard, getUserById)     
router.post("/", addUser)                      
router.put("/:id", userGuard, updateUser)      
router.delete("/:id", adminGuard, deleteUser)  

module.exports = router
