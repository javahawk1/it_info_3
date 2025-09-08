const jwt = require("jsonwebtoken")
const config = require("config")
const Author = require("../models/author.model")

const authGuard = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Access token is required" })
        }

        const token = authHeader.split(" ")[1]
        
        try {
            const decoded = jwt.verify(token, config.get("secret_key"))
            
            const author = await Author.findByPk(decoded.id)
            if (!author || !author.author_is_active) {
                return res.status(401).send({ message: "Author not found or inactive" })
            }

            req.author = {
                id: author.id,
                email: author.author_email,
                is_expert: author.is_expert
            }
            
            next()
        } catch (jwtErr) {
            return res.status(401).send({ message: "Invalid or expired token" })
        }
    } catch (err) {
        return res.status(500).send({ message: "Server error", error: err.message })
    }
}

const selfGuard = async (req, res, next) => {
    try {
        const authorId = req.params.id || req.body.author_id
        
        if (!authorId) {
            return res.status(400).send({ message: "Author ID is required" })
        }

        if (parseInt(authorId) !== req.author.id) {
            return res.status(403).send({ message: "Access denied. You can only modify your own data" })
        }

        next()
    } catch (err) {
        return res.status(500).send({ message: "Server error", error: err.message })
    }
}

const expertGuard = (req, res, next) => {
    if (!req.author.is_expert) {
        return res.status(403).send({ message: "Access denied. Expert privileges required" })
    }
    next()
}

module.exports = {
    authGuard,
    selfGuard,
    expertGuard
}