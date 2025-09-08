const bcrypt = require("bcrypt")

const { Admin } = require("../models")

const sendError = require("../middlewares/errors/error.handling")

const getAllAdmins = async (req, res) => {
    try {
        const data = await Admin.findAll()
        res.send({ message: "successfully retrieved all Admins", data })
    } catch (err) {
        res.status(500).send({ message: "server error", err })
    }
}

const getAdminById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Admin.findByPk(id)

        if (!data) {
            return res.status(404).send({ "message": "Admin not found" })
        }

        res.send({ message: "successfully retrieved Admin", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addAdmin = async (req, res) => {
    try {
        const arr = [
            "Admin_first_name",
            "Admin_email",
            "Admin_phone",
            "Admin_password",
        ];

        for (const i of arr) {
            if (!req.body[i]) {
                return res.status(400).json({ message: `${i} is required` });
            }
        }

        const { Admin_password } = req.body
        const hashed_password = await bcrypt.hash(Admin_password, 7)

        const data = await Admin.create({ ...req.body, Admin_password: hashed_password })

        res.send({ message: "Admin created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const upadateAdmin = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Admin.update(req.body, { where: { id }, returning: true })

        if (!data[0]) {
            return res.status(404).send({ "message": "Admin not found" })
        }

        res.send({ message: "Admin updated successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id
        const admin = await Admin.findByPk(id)
        const data = await Admin.destroy({ where: { id } })

        if (!Admin) {
            return res.status(404).send({ message: "Admin not foudn" })
        }

        res.send({ message: "Admin deleted successfully", deleted: admin, data })

    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllAdmins,
    addAdmin,
    getAdminById,
    upadateAdmin,
    deleteAdmin
}