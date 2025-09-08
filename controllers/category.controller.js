const { Category } = require("../models")

const sendError = require("../middlewares/errors/error.handling")

const getAllCategorys = async (req, res) => {
    try {
        const data = await Category.findAll()
        res.send({ message: "successfully retrieved all Categorys", data })
    } catch (err) {
        res.status(500).send({ message: "server error", err })
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Category.findByPk(id)

        if (!data) {
            return res.status(404).send({ "message": "Category not found" })
        }

        res.send({ message: "successfully retrieved Category", data })
    } catch (err) {
        sendError(err, res)
    }
}

const addCategory = async (req, res) => {
    try {
        const data = await Category.create(req.body)

        res.send({ message: "Category created successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const upadateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Category.update(req.body, { where: { id }, returning: true })

        if (!data[0]) {
            return res.status(404).send({ "message": "Category not found" })
        }

        res.send({ message: "Category updated successfully", data })
    } catch (err) {
        sendError(err, res)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findByPk(id)
        const data = await Category.destroy({ where: { id } })

        if (!Category) {
            return res.status(404).send({ message: "Category not found" })
        }

        res.send({ message: "Category deleted successfully", deleted: category, data })

    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    getAllCategorys,
    addCategory,
    getCategoryById,
    upadateCategory,
    deleteCategory
}