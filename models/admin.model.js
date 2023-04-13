'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const admin = sequelize.define('admins', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'admins',
        timestamps: false
    });
    return admin;
};