const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")
const { User } = require("../models")

const loginUser = async (req, res) => {
    try {
        const { user_email, user_password } = req.body

        const user = await User.findOne({ where: { user_email } })
        if (!user) return res.status(404).json({ message: "User not found" })

        const isValid = await bcrypt.compare(user_password, user.user_password)
        if (!isValid) return res.status(401).json({ message: "Invalid password" })

        const accessToken = jwt.sign(
            { id: user.id, email: user.user_email },
            config.get("access_secret"),
            { expiresIn: "15m" }
        )

        const refreshToken = jwt.sign(
            { id: user.id, email: user.user_email },
            config.get("refresh_secret"),
            { expiresIn: "7d" }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            message: "Login successful",
            accessToken,
            user: {
                id: user.id,
                name: user.user_name,
                email: user.user_email
            }
        })

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}


const logoutUser = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findByPk(id)
        if (!user) return res.status(404).json({ message: "User topilmadi" })

        await user.update({ refresh_token: null })

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,  
            sameSite: "Strict"
        })

        res.json({ message: "Logout muvaffaqiyatli" })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}


const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(401).json({ message: "No refresh token" })

        const user = await User.findOne({ where: { refresh_token: refreshToken } })
        if (!user) return res.status(403).json({ message: "Token invalid (logged out)" })

        const decoded = jwt.verify(refreshToken, config.get("refresh_secret"))

        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            config.get("access_secret"),
            { expiresIn: "15m" }
        )

        res.json({ accessToken: newAccessToken })

    } catch (err) {
        res.status(403).json({ message: "Invalid or expired refresh token" })
    }
}




module.exports = { loginUser, logoutUser, refreshAccessToken }
