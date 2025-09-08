const { Author, Social, Author_Social } = require("../models")

const sendError = require("../middlewares/errors/error.handling")

const getAllAuthorSocials = async (req, res) => {
    try {
        const data = await Author_Social.findAll({
            include: [
                {
                    model: Author,
                    attributes: ["id", "author_first_name", "author_email"] 
                },
                {
                    model: Social,
                    attributes: ["id", "social_name"]
                }
            ]
        })
        res.send({ message: "successfully retrieved all author_socials", data })
    } catch (err) {
        sendError(err, res)
    }
}

const getAuthorSocialById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Author_Social.findByPk(id, {
            include: [
                {
                    model: Author,
                    attributes: ["id", "author_first_name", "author_email"] 
                },
                {
                    model: Social,
                    attributes: ["id", "social_name"]
                }
            ]
        })

        if (!data) return res.status(404).send({ message: "author_social not found" })

        res.send({ message: "successfully retrieved author_social", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addAuthorSocial = async (req, res) => {
    try {
        const { author_id, social_id } = req.body
        if (!author_id || !social_id) {
            return res.status(400).send({ message: "author_id and social_id are required" })
        }

        const data = await Author_Social.create(req.body)
        res.send({ message: "author_social created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const updateAuthorSocial = async (req, res) => {
    try {
        const id = req.params.id
        const [count, updated] = await Author_Social.update(req.body, {
            where: { id },
            returning: true
        })

        if (!count) return res.status(404).send({ message: "author_social not found" })

        res.send({ message: "author_social updated successfully", data: updated })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteAuthorSocial = async (req, res) => {
    try {
        const id = req.params.id
        const authorSocial = await Author_Social.findByPk(id)
        if (!authorSocial) {
            return res.status(404).send({ message: "author_social not found" })
        }

        await Author_Social.destroy({ where: { id } })
        res.send({ message: "author_social deleted successfully", deleted: authorSocial })
    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllAuthorSocials,
    getAuthorSocialById,
    addAuthorSocial,
    updateAuthorSocial,
    deleteAuthorSocial
}
