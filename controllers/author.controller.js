const bcrypt = require("bcrypt")

const { Author } = require("../models")

const sendError = require("../middlewares/errors/error.handling")

const getAllAuthors = async (req, res) => {
    try {
        const data = await Author.findAll()
        res.send({ message: "successfully retrieved all authors", data })
    } catch (err) {
        res.status(500).send({ message: "server error", err })
    }
}

const getAuthorById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Author.findByPk(id)

        if (!data) {
            return res.status(404).send({ "message": "author not found" })
        }

        res.send({ message: "successfully retrieved author", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addAuthor = async (req, res) => {
    try {
        const arr = [
            "author_first_name",
            "author_email",
            "author_phone",
            "author_password",
        ];

        for (const i of arr) {
            if (!req.body[i]) {
                return res.status(400).json({ message: `${i} is required` });
            }
        }

        const { author_password } = req.body
        const hashed_password = await bcrypt.hash(author_password, 7)

        const data = await Author.create({ ...req.body, author_password: hashed_password })

        res.send({ message: "author created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const upadateAuthor = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Author.update(req.body, { where: { id }, returning: true })

        if (!data[0]) {
            return res.status(404).send({ "message": "author not found" })
        }

        res.send({ message: "author updated successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id
        const author = await Author.findByPk(id)
        const data = await Author.destroy({ where: { id } })

        if (!author) {
            return res.status(404).send({ message: "author not foudn" })
        }

        res.send({ message: "author deleted successfully", deleted: author, data })

    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllAuthors,
    addAuthor,
    getAuthorById,
    upadateAuthor,
    deleteAuthor
}