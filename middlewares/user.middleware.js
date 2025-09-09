const jwt = require("jsonwebtoken")
const config = require("config")

const userGuard = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        if (!authHeader) return res.status(401).json({ message: "Token kerak" })

        const token = authHeader.split(" ")[1]
        if (!token) return res.status(401).json({ message: "Token notogri formatda" })

        const decoded = jwt.verify(token, config.get("access_secret"))
        req.user = decoded 
        next()
    } catch (err) {
        return res.status(403).json({ message: "Token yaroqsiz yoki muddati tugagan" })
    }
}


module.exports = userGuard
