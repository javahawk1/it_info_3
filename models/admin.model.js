const { DataTypes } = require("sequelize")

const sequelize = require("../config/db")

const Admin = sequelize.define("Admin",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        admin_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        admin_phone: {
            type: DataTypes.STRING,
            unique: true
        },
        admin_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin_is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        admin_is_creator: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
    tableName: "admin",
    timestamps: true
})

module.exports = Admin