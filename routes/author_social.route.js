const router = require("express").Router()
const {
    getAllAuthorSocials,
    getAuthorSocialById,
    addAuthorSocial,
    updateAuthorSocial,
    deleteAuthorSocial
} = require("../controllers/author_social.controller")

router.get("/", getAllAuthorSocials)
router.get("/:id", getAuthorSocialById)
router.post("/", addAuthorSocial)
router.put("/:id", updateAuthorSocial)
router.delete("/:id", deleteAuthorSocial)

module.exports = router
