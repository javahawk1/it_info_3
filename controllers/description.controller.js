const { Description } = require("../models")

const sendError = require("../middlewares/errors/error.handling")

const getAllDescriptions = async (req, res) => {
    try {
        const data = await Description.findAll()
        res.send({ message: "successfully retrieved all Descriptions", data })
    } catch (err) {
        res.status(500).send({ message: "server error", err })
    }
}

const getDescriptionById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Description.findByPk(id)

        if (!data) {
            return res.status(404).send({ "message": "Description not found" })
        }

        res.send({ message: "successfully retrieved Description", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addDescription = async (req, res) => {
    try {
        const data = await Description.create(req.body)

        res.send({ message: "Description created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const upadateDescription = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Description.update(req.body, { where: { id }, returning: true })

        if (!data[0]) {
            return res.status(404).send({ "message": "Description not found" })
        }

        res.send({ message: "Description updated successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteDescription = async (req, res) => {
    try {
        const id = req.params.id
        const description = await Description.findByPk(id)
        const data = await Description.destroy({ where: { id } })

        if (!description) {
            return res.status(404).send({ message: "Description not found" })
        }

        res.send({ message: "Description deleted successfully", deleted: description, data })

    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllDescriptions,
    addDescription,
    getDescriptionById,
    upadateDescription,
    deleteDescription
}