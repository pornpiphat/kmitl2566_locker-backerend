'use strict';
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const lockle_replywork = sequelize.define('locker_replywork', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lockerId: {
            type: DataTypes.INTEGER,
        },
        password: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'lockle_replywork',
        timestamps: false
    });
    return lockle_replywork;
};