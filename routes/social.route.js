const router = require("express").Router()

const {
    getAllSocials,
    getSocialById,
    addSocial,
    updateSocial,
    deleteSocial
} = require("../controllers/social.controller")

router.get("/", getAllSocials)    
router.get("/:id", getSocialById)
router.post("/", addSocial)      
router.put("/:id", updateSocial)  
router.delete("/:id", deleteSocial)

module.exports = router
