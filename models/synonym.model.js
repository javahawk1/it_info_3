const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Synoym = sequelize.define("Synonym",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dict_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: "synonym"
})

module.exports = Synoym