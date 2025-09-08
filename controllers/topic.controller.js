const { Topic } = require("../models");
const sendError = require("../middlewares/errors/error.handling");

const getAllTopics = async (req, res) => {
    try {
        const data = await Topic.findAll();
        res.send({ message: "successfully retrieved all topics", data });
    } catch (err) {
        sendError(err, res);
    }
};

const getTopicById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Topic.findByPk(id);

        if (!data) {
            return res.status(404).send({ message: "topic not found" });
        }

        res.send({ message: "successfully retrieved topic", data });
    } catch (err) {
        sendError(err, res);
    }
};

const addTopic = async (req, res) => {
    try {
        const arr = ["author_id", "topic_title", "topic_text"];

        for (const i of arr) {
            if (!req.body[i]) {
                return res.status(400).json({ message: `${field} is required` });
            }
        }

        const data = await Topic.create(req.body);
        res.send({ message: "topic created successfully", data });
    } catch (err) {
        sendError(err, res);
    }
};

const updateTopic = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Topic.update(req.body, { where: { id }, returning: true });

        if (!data[0]) {
            return res.status(404).send({ message: "topic not found" });
        }

        res.send({ message: "topic updated successfully", data });
    } catch (err) {
        sendError(err, res);
    }
};

const deleteTopic = async (req, res) => {
    try {
        const id = req.params.id;
        const topic = await Topic.findByPk(id);

        if (!topic) {
            return res.status(404).send({ message: "topic not found" });
        }

        await Topic.destroy({ where: { id } });
        res.send({ message: "topic deleted successfully", deleted: topic });
    } catch (err) {
        sendError(err, res);
    }
};

module.exports = {
    getAllTopics,
    getTopicById,
    addTopic,
    updateTopic,
    deleteTopic
};
