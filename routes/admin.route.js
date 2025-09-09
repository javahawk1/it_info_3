const router = require("express").Router()

const {
    getAllAdmins,
    addAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
} = require("../controllers/admin.controller")

const {
    loginAdmin, 
    logoutAdmin,
    refreshAdminAccessToken
} = require("../controllers/admin.auth")

const { adminGuard, creatorGuard } = require("../middlewares/admin.middleware")

router.post("/login", loginAdmin)
router.post("/logout", adminGuard, logoutAdmin)
router.post("/refreshToken", refreshAdminAccessToken) 
router.get("/", adminGuard, getAllAdmins)
router.post("/", addAdmin)
router.get("/:id", adminGuard, getAdminById)
router.put("/:id", adminGuard, updateAdmin)
router.delete("/:id", adminGuard, creatorGuard, deleteAdmin)

module.exports = router
