'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const locker_professors = sequelize.define('locker_professors', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lockerId: {
            type: DataTypes.INTEGER,
        },
        professorId: {
            type: DataTypes.INTEGER,
        },
        password: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'locker_professors',
        timestamps: false
    });
    return locker_professors;
};