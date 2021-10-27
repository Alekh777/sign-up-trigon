const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/test.db'
})

const Users = db.define('user', {
    name: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {
    db, Users
}