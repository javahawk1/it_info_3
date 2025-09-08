const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Description = sequelize.define("Description",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "description"
})

module.exports = Description