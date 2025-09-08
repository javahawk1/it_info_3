const { DataTypes } = require("sequelize")

const sequelize = require("../config/db")

const Author = sequelize.define("Author",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author_first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author_last_name: {
            type: DataTypes.STRING,
        },
        author_nick_name: {
            type: DataTypes.STRING,
            unique: true
        },
        author_email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        author_phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^\+998[0-9]{9}$/
            }
        },
        author_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author_info: {
            type: DataTypes.STRING
        },
        author_position: {
            type: DataTypes.STRING
        },
        author_photo: {
            type: DataTypes.STRING
        },
        is_expert: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        author_is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
         refresh_token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
    tableName: "author",
    timestamps: true
}
)

module.exports = Author