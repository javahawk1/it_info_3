const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Author_Social = sequelize.define("Author_Social", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    social_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    social_link: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "author_social",
    timestamps: false
})

module.exports = Author_Social
