const { Synonym } = require("../models")

const sendError = require("../middlewares/errors/error.handling")

const getAllSynonyms = async (req, res) => {
    try {
        const data = await Synonym.findAll()
        res.send({ message: "successfully retrieved all Synonyms", data })
    } catch (err) {
        res.status(500).send({ message: "server error", err })
    }
}

const getSynonymById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Synonym.findByPk(id)

        if (!data) {
            return res.status(404).send({ "message": "Synonym not found" })
        }

        res.send({ message: "successfully retrieved Synonym", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addSynonym = async (req, res) => {
    try {
        const data = await Synonym.create(req.body)

        res.send({ message: "Synonym created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const upadateSynonym = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Synonym.update(req.body, { where: { id }, returning: true })

        if (!data[0]) {
            return res.status(404).send({ "message": "Synonym not found" })
        }

        res.send({ message: "Synonym updated successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteSynonym = async (req, res) => {
    try {
        const id = req.params.id
        const synonym = await Synonym.findByPk(id)
        const data = await Synonym.destroy({ where: { id } })

        if (!synonym) {
            return res.status(404).send({ message: "Synonym not found" })
        }

        res.send({ message: "Synonym deleted successfully", deleted: synonym, data })

    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllSynonyms,
    addSynonym,
    getSynonymById,
    upadateSynonym,
    deleteSynonym
}