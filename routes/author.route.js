const router = require("express").Router()
const { authGuard, selfGuard, expertGuard } = require("../middlewares/auth.middleware")

const {
    getAllAuthors,
    addAuthor,
    getAuthorById,
    upadateAuthor,
    deleteAuthor
} = require("../controllers/author.controller")

router.get("/", getAllAuthors)
router.post("/", addAuthor)
router.get("/:id", authGuard, getAuthorById)
router.put("/:id", authGuard, selfGuard, upadateAuthor)
router.delete("/:id", authGuard, selfGuard, deleteAuthor)

module.exports = router