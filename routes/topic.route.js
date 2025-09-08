const router = require("express").Router()

const {
    getAllTopics,
    getTopicById,
    addTopic,
    updateTopic,
    deleteTopic
} = require("../controllers/topic.controller")

router.get("/", getAllTopics)
router.get("/:id", getTopicById)
router.post("/", addTopic)
router.put("/:id", updateTopic)
router.delete("/:id", deleteTopic)

module.exports = router