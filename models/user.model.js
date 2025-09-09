const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_info: {
        type: DataTypes.STRING
    },
    user_photo: {
        type: DataTypes.STRING
    },
    user_is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "user",
    timestamps: true
})

module.exports = User
