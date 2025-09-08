const { Social } = require("../models")
const sendError = require("../middlewares/errors/error.handling")

const getAllSocials = async (req, res) => {
    try {
        const data = await Social.findAll()
        res.send({ message: "successfully retrieved all socials", data })
    } catch (err) {
        sendError(err, res)
    }
}

const getSocialById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Social.findByPk(id)

        if (!data) {
            return res.status(404).send({ message: "social not found" })
        }

        res.send({ message: "successfully retrieved social", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addSocial = async (req, res) => {
    try {
        const { social_name } = req.body
        if (!social_name) {
            return res.status(400).send({ message: "social_name is required" })
        }

        const data = await Social.create(req.body)
        res.send({ message: "social created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const updateSocial = async (req, res) => {
    try {
        const id = req.params.id
        const [count, updated] = await Social.update(req.body, {
            where: { id },
            returning: true
        })

        if (!count) {
            return res.status(404).send({ message: "social not found" })
        }

        res.send({ message: "social updated successfully", data: updated })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteSocial = async (req, res) => {
    try {
        const id = req.params.id
        const social = await Social.findByPk(id)
        if (!social) {
            return res.status(404).send({ message: "social not found" })
        }

        await Social.destroy({ where: { id } })
        res.send({ message: "social deleted successfully", deleted: social })
    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllSocials,
    getSocialById,
    addSocial,
    updateSocial,
    deleteSocial
}
