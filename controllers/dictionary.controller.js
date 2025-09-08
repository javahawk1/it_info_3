const { Dictionary } = require("../models")

const sendError = require("../middlewares/errors/error.handling")

const getAllDictionarys = async (req, res) => {
    try {
        const data = await Dictionary.findAll()
        res.send({ message: "successfully retrieved all Dictionarys", data })
    } catch (err) {
        res.status(500).send({ message: "server error", err })
    }
}

const getDictionaryById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Dictionary.findByPk(id)

        if (!data) {
            return res.status(404).send({ "message": "Dictionary not found" })
        }

        res.send({ message: "successfully retrieved Dictionary", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addDictionary = async (req, res) => {
    try {
        const data = await Dictionary.create(req.body)

        res.send({ message: "Dictionary created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const upadateDictionary = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Dictionary.update(req.body, { where: { id }, returning: true })

        if (!data[0]) {
            return res.status(404).send({ "message": "Dictionary not found" })
        }

        res.send({ message: "Dictionary updated successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteDictionary = async (req, res) => {
    try {
        const id = req.params.id
        const dictionary = await Dictionary.findByPk(id)
        const data = await Dictionary.destroy({ where: { id } })

        if (!dictionary) {
            return res.status(404).send({ message: "Dictionary not found" })
        }

        res.send({ message: "Dictionary deleted successfully", deleted: dictionary, data })

    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllDictionarys,
    addDictionary,
    getDictionaryById,
    upadateDictionary,
    deleteDictionary
}