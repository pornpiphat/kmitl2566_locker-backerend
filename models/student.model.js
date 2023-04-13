'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            required: false
        },
        lanstname: {
            type: DataTypes.STRING,
            required: false
        },
        student_code: {
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
        modelName: 'student',
        timestamps: true
    });
    return Student;
};