'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const locker = sequelize.define('locker', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lockerNmae: {
            type: DataTypes.STRING,
            required: false
        },
        lockerRoleId: {
            type: DataTypes.INTEGER,
            required: false
        },
        output: {
            type: DataTypes.INTEGER,
            required: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
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
        modelName: 'locker',
        timestamps: false
    });
    return locker;
};