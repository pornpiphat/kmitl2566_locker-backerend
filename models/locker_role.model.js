'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const lockerRole = sequelize.define('locker_role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            required: false
        },
        active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        deleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        createdBy: {
            type: DataTypes.STRING
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        updatedBy: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'locker_role',
        timestamps: false
    });
    return lockerRole;
};