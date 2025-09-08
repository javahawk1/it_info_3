const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Topic = sequelize.define("Topic", 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    topic_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    topic_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    expert_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, 
{
    tableName: "topic",
    timestamps: true 
});

module.exports = Topic;
