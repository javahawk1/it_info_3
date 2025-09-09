const config = require("config")
const jwt = require("jsonwebtoken")

const adminGuard = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        if (!authHeader) {
            return res.status(401).json({ message: "Token kerak" })
        }

        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Token noto‘g‘ri formatda" })
        }

        const decoded = jwt.verify(token, config.get("access_secret"))  // ✅ sync ishlatildi
        req.admin = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: "Token yaroqsiz yoki muddati tugagan" })
    }
}


const creatorGuard = (req, res, next) => {
    console.log(req.admin)
    if (!req.admin || !req.admin.is_creator) {
        return res.status(403).json({ message: "Faqat creator admin kirishi mumkin" })
    }
    next()
}

module.exports = { adminGuard, creatorGuard }
