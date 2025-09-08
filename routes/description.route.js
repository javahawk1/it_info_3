const router = require("express").Router()

const {
    getAllDescriptions,
    addDescription,
    getDescriptionById,
    upadateDescription,
    deleteDescription
} = require("../controllers/description.controller")

router.get("/", getAllDescriptions)
router.get("/:id", getDescriptionById)
router.post("/", addDescription)
router.put("/:id", upadateDescription)
router.delete("/:id", deleteDescription)

module.exports = router