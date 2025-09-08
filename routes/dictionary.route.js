const router = require("express").Router()

const {
    getAllDictionarys,
    addDictionary,
    getDictionaryById,
    upadateDictionary,
    deleteDictionary
} = require("../controllers/dictionary.controller")

router.get("/", getAllDictionarys)
router.get("/:id", getDictionaryById)
router.post("/", addDictionary)
router.put("/:id", upadateDictionary)
router.delete("/:id", deleteDictionary)

module.exports = router