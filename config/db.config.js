'use strict'
const Sequelize = require('sequelize');
const env = require('./env');


const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: 'mssql',
  dialectOptions: {
    instanceName: env.DATABASE_INSTANCE,
    options: {
      // Your tedious options here
      useUTC: false,
      dateFirst: 1
    }
  }
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.sequelize = sequelize;
db.sequelize.sync();
//Models/tables
db.student = require('../models/student.model')(sequelize, Sequelize);
db.lockerRole = require('../models/locker_role.model')(sequelize, Sequelize);
db.locker = require('../models/locker.model')(sequelize, Sequelize);
db.student_lockers = require('../models/student_lockers.model')(sequelize, Sequelize);
db.professors = require('../models/professors.model')(sequelize, Sequelize);
db.locker_professors = require('../models/locker_professors.model')(sequelize, Sequelize);
db.locker_replywork = require('../models/locker_replywork.model')(sequelize, Sequelize);
db.admin = require('../models/admin.model')(sequelize, Sequelize)

//  locker :  lockerRole
db.lockerRole.hasMany(db.locker, { as: "lockers" });
db.locker.belongsTo(db.lockerRole, {
  foreignKey: "lockerRoleId",
  as: "lockerRole",
});

//  student_lockers :  locker :  student
db.student.hasMany(db.student_lockers, { as: "student_lockers" });
db.student_lockers.belongsTo(db.locker, {
  foreignKey: "studentId",
  as: "student",
})
db.locker.hasMany(db.student_lockers, { as: "student_lockers" });
db.student_lockers.belongsTo(db.locker, {
  foreignKey: "lockerId",
  as: "locker",
})


//  locker_professors :  locker : professors

db.locker.belongsToMany(db.professors, {
  through: db.locker_professors,
  foreignKey: 'lockerId',
  otherKey: 'professorId'
});
db.professors.belongsToMany(db.locker, {
  through: db.locker_professors,
  foreignKey: 'professorId',
  otherKey: 'lockerId'
});

// 

db.locker_replywork.belongsTo(db.locker, {
  foreignKey: "lockerId",
  as: "locker",
})
module.exports = db;