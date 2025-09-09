const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")
const { Admin } = require("../models")

const loginAdmin = async (req, res) => {
    try {
        const { admin_email, admin_password } = req.body

        if (!admin_email || !admin_password) {
            return res.status(400).json({ message: "Email va parol kerak" })
        }

        const admin = await Admin.findOne({ where: { admin_email } })
        if (!admin) return res.status(404).json({ message: "Admin topilmadi" })

        const isValid = await bcrypt.compare(admin_password, admin.admin_password)
        if (!isValid) return res.status(401).json({ message: "Parol noto‘g‘ri" })

        if (!admin.admin_is_active) return res.status(403).json({ message: "Admin bloklangan" })

        const accessToken = jwt.sign(
            { id: admin.id, email: admin.admin_email, is_creator: admin.admin_is_creator },
            config.get("access_secret"),
            { expiresIn: "1h" }
        )

        const refreshToken = jwt.sign(
            { id: admin.id, email: admin.admin_email },
            config.get("refresh_secret"),
            { expiresIn: "7d" }
        )

        await admin.update({ refresh_token: refreshToken })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,  
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            message: "Login successful",
            accessToken,
            admin: {
                id: admin.id,
                name: admin.admin_name,
                email: admin.admin_email,
                is_creator: admin.admin_is_creator
            }
        })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

const logoutAdmin = async (req, res) => {
    try {
        const { id } = req.admin
        const admin = await Admin.findByPk(id)
        if (!admin) return res.status(404).json({ message: "Admin topilmadi" })

        await admin.update({ refresh_token: null })

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

const refreshAdminAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(401).json({ message: "No refresh token" })

        const admin = await Admin.findOne({ where: { refresh_token: refreshToken } })
        if (!admin) return res.status(403).json({ message: "Token invalid (logged out)" })

        const decoded = jwt.verify(refreshToken, config.get("refresh_secret"))

        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email, is_creator: admin.admin_is_creator },
            config.get("access_secret"),
            { expiresIn: "1h" }
        )

        res.json({ accessToken: newAccessToken })
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired refresh token" })
    }
}

module.exports = { loginAdmin, logoutAdmin, refreshAdminAccessToken }
