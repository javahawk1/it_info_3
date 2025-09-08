const router = require("express").Router()

const {
    getAllAdmins,
    addAdmin,
    getAdminById,
    upadateAdmin,
    deleteAdmin
} = require("../controllers/admin.controller")

router.get("/", getAllAdmins)
router.post("/", addAdmin)
router.get("/:id", getAdminById)
router.put("/:id", upadateAdmin)
router.delete("/:id", deleteAdmin)

module.exports = router