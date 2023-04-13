'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const student_lockers = sequelize.define('student_lockers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        studentId: {
            type: DataTypes.INTEGER,
        },
        lockerId: {
            type: DataTypes.INTEGER,
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
        modelName: 'student_lockers',
        timestamps: false
    });
    return student_lockers;
};