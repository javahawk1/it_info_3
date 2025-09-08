const bcrypt = require("bcrypt")

const { User } = require("../models")

const sendError = require("../middlewares/errors/error.handling")

const getAllUsers = async (req, res) => {
    try {
        const data = await User.findAll()
        res.send({ message: "successfully retrieved all Users", data })
    } catch (err) {
        res.status(500).send({ message: "server error", err })
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findByPk(id)

        if (!data) {
            return res.status(404).send({ "message": "User not found" })
        }

        res.send({ message: "successfully retrieved User", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addUser = async (req, res) => {
    try {
        const arr = [
            "User_first_name",
            "User_email",
            "User_phone",
            "User_password",
        ];

        for (const i of arr) {
            if (!req.body[i]) {
                return res.status(400).json({ message: `${i} is required` });
            }
        }

        const { User_password } = req.body
        const hashed_password = await bcrypt.hash(User_password, 7)

        const data = await User.create({ ...req.body, User_password: hashed_password })

        res.send({ message: "User created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const upadateUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.update(req.body, { where: { id }, returning: true })

        if (!data[0]) {
            return res.status(404).send({ "message": "User not found" })
        }

        res.send({ message: "User updated successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        const data = await User.destroy({ where: { id } })

        if (!User) {
            return res.status(404).send({ message: "User not foudn" })
        }

        res.send({ message: "User deleted successfully", deleted: user, data })

    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    upadateUser,
    deleteUser
}