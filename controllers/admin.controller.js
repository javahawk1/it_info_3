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
            "admin_name",
            "admin_email",
            "admin_phone",
            "admin_password",
        ];

        for (const i of arr) {
            if (!req.body[i]) {
                return res.status(400).json({ message: `${i} is required` });
            }
        }

        const { admin_password } = req.body
        const hashed_password = await bcrypt.hash(admin_password, 7)

        const data = await Admin.create({ ...req.body, admin_password: hashed_password })

        res.send({ message: "Admin created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const updateAdmin = async (req, res) => {
    try {
        const id = req.params.id

        const [count, rows] = await Admin.update(req.body, {
            where: { id },
            returning: true
        })

        if (!count) {
            return res.status(404).send({ message: "Admin not found" })
        }

        res.send({ 
            message: "Admin updated successfully", 
            data: rows[0]
        })
    } catch (err) {
        sendError(err, res)
    }
}


const deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id
        const admin = await Admin.findByPk(id)
        const data = await Admin.destroy({ where: { id } })

        if (!admin) {
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
    updateAdmin,
    deleteAdmin
}