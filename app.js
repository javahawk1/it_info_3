const express = require("express")
const cors = require("cors")
const config = require("config")
const sequelize = require("./config/db")

const app = express()

app.use(express.json())
app.use(cors())

const mainRouter = require("./routes")

app.use("/api", mainRouter)

const PORT = config.get("port") || 3000

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => {
            console.log(`server started on port: ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()