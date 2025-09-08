const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")

const { Author } = require("../models")
const sendError = require("../middlewares/errors/error.handling")

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, config.get("secret_key"), { expiresIn: "15m" })
    const refreshToken = jwt.sign(payload, config.get("secret_key"), { expiresIn: "30d" })
    return { accessToken, refreshToken }
}

const login = async (req, res) => {
    try {
        const { author_email, author_password } = req.body

        if (!author_email || !author_password) {
            return res.status(400).send({ message: "Email and password are required" })
        }

        const author = await Author.findOne({ where: { author_email } })
        if (!author) {
            return res.status(404).send({ message: "Author not found" })
        }

        const isPasswordValid = await bcrypt.compare(author_password, author.author_password)
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" })
        }

        const tokens = generateTokens({
            id: author.id,
            email: author.author_email,
            is_expert: author.is_expert
        })

        await Author.update(
            { refresh_token: tokens.refreshToken },
            { where: { id: author.id } }
        )

        res.send({
            message: "Login successful",
            tokens,
            author: {
                id: author.id,
                first_name: author.author_first_name,
                last_name: author.author_last_name,
                email: author.author_email,
                is_expert: author.is_expert
            }
        })
    } catch (err) {
        sendError(err, res)
    }
}

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body

        if (!refreshToken) {
            return res.status(400).send({ message: "Refresh token is required" })
        }

        const author = await Author.findOne({ where: { refresh_token: refreshToken } })
        if (author) {
            await Author.update(
                { refresh_token: null },
                { where: { id: author.id } }
            )
        }

        res.send({ message: "Logout successful" })
    } catch (err) {
        sendError(err, res)
    }
}

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body

        if (!refreshToken) {
            return res.status(400).send({ message: "Refresh token is required" })
        }

        const author = await Author.findOne({ where: { refresh_token: refreshToken } })
        if (!author) {
            return res.status(401).send({ message: "Invalid refresh token" })
        }

        try {
            const decoded = jwt.verify(refreshToken, config.get("secret_key"))

            const newTokens = generateTokens({
                id: decoded.id,
                email: decoded.email,
                is_expert: decoded.is_expert
            })

            await Author.update(
                { refresh_token: newTokens.refreshToken },
                { where: { id: author.id } }
            )

            res.send({
                message: "Token refreshed successfully",
                tokens: newTokens
            })
        } catch (jwtErr) {
            return res.status(401).send({ message: "Invalid or expired refresh token" })
        }
    } catch (err) {
        sendError(err, res)
    }
}

module.exports = {
    login,
    logout,
    refreshToken
}