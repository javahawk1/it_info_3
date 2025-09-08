const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Dictionary = sequelize.define("Dictionary",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        term: {
            type: DataTypes.STRING,
            allowNull: false
        },
        letter: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "dictionary",
        timestamps: false
    }
)

module.exports = Dictionary