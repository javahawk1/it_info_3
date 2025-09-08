const router = require("express").Router()

const {
    getAllSynonyms,
    addSynonym,
    getSynonymById,
    upadateSynonym,
    deleteSynonym
} = require("../controllers/synonym.controller")

router.get("/", getAllSynonyms)
router.get("/:id", getSynonymById)
router.post("/", addSynonym)
router.put("/:id", upadateSynonym)
router.delete("/:id", deleteSynonym)

module.exports = router