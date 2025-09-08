const router = require("express").Router()

const {
    getAllUsers,
    addUser,
    getUserById,
    upadateUser,
    deleteUser
} = require("../controllers/user.controller")

router.get("/", getAllUsers)
router.post("/", addUser)
router.get("/:id", getUserById)
router.put("/:id", upadateUser)
router.delete("/:id", deleteUser)

module.exports = router