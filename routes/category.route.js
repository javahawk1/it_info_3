const router = require("express").Router()

const {
    getAllCategorys,
    addCategory,
    getCategoryById,
    upadateCategory,
    deleteCategory
} = require("../controllers/category.controller")

router.get("/", getAllCategorys)
router.get("/:id", getCategoryById)
router.post("/", addCategory)
router.put("/:id", upadateCategory)
router.delete("/:id", deleteCategory)

module.exports = router