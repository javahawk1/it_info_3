const sendError = (err, res) => {
    if (err.name == "SequelizeValidationError") {
        return res.status(400).send({ message: err.errors[0].message })
    } else if (err.name == "SequelizeUniqueConstraintError") {
        return res.status(400).send({ message: err.parent.detail })
    } else {
        return res.status(500).send({ message: err })
    }
}

module.exports = sendError