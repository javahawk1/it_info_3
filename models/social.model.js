const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Social = sequelize.define("Social", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    social_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    social_icon_file: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "social",
    timestamps: false
})

module.exports = Social
