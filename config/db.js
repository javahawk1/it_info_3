const { Sequelize } = require("sequelize")
const config = require("config")

const sequelize = new Sequelize(
    config.get("database"),
    config.get("username"),
    config.get("password"),
    {
        host: config.get("host"),
        dialect: config.get("dialect"),
        logging: false
    }
)

module.exports = sequelize