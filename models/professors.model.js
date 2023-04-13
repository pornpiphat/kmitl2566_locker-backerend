
'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const professor = sequelize.define('professors', {
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
    }, {
        sequelize,
        modelName: 'professors',
        timestamps: false
    });
    return professor;
};