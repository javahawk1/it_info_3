const bcrypt = require("bcrypt")
const { User } = require("../models")
const sendError = require("../middlewares/errors/error.handling")

const getAllUsers = async (req, res) => {
    try {
        const data = await User.findAll()
        res.send({ message: "Successfully retrieved all users", data })
    } catch (err) {
        res.status(500).send({ message: "Server error", err })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findByPk(id)

        if (!data) {
            return res.status(404).send({ message: "User not found" })
        }

        res.send({ message: "Successfully retrieved user", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addUser = async (req, res) => {
    try {
        const requiredFields = ["user_name", "user_email", "user_password"]

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `${field} is required` })
            }
        }

        const { user_password } = req.body
        const hashedPassword = await bcrypt.hash(user_password, 7)

        const data = await User.create({ ...req.body, user_password: hashedPassword })

        res.status(201).send({ message: "User created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id

        const [count, rows] = await User.update(req.body, {
            where: { id },
            returning: true
        })

        if (!count) {
            return res.status(404).send({ message: "User not found" })
        }

        res.send({ message: "User updated successfully", data: rows[0] })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        await User.destroy({ where: { id } })

        res.send({ message: "User deleted successfully", deleted: user })
    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser
}
