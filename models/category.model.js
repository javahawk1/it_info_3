const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Category = sequelize.define("Category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
        },
        parent_category_id: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: "category"
})

module.exports = Category