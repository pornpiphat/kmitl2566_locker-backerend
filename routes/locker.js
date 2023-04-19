const router = require('express').Router()
const { Sequelize, Op } = require('sequelize');
const db = require("../config/db.config");
router.get('/', async (req, res,) => {
    const type = req.query.type;
    const typeList = type.split(',');
    if (!type) {
        return res.status(200).send("Type is required");
    }
    const info = await db.locker.findAll({
        include: [
            {
                model: db.lockerRole, // include the LockerRole model
                as: 'lockerRole', // set the alias for the LockerRole model
                where: {
                    name: {
                        [Op.in]: typeList
                    }
                } // set the
            }
        ],
    });
    return res.status(200).json(info);
});



router.get('/overused', async (req, res,) => {
    const [results, metadata] = await db.sequelize.query('SELECT * from [lockers_overused];');
    return res.status(200).json(results);
});


router.post('/reply-overused', async (req, res,) => {
    const studentId = req.body.studentId;
    const sql = `SELECT * from [lockers_overused] where studentId = ${studentId};`;
    const [results, metadata] = await db.sequelize.query(sql);
    if (!results.length) {
        return res.json(
            {
                status: 404,
                message: 'Student Not Found'
            }
        );
    }
    await db.student_lockers.destroy({
        where: { studentId: studentId }
    })
    await db.locker.update(
        { status: 1 },
        { where: { id: results[0].lockerId } }
    )
    const responseMap = {
        status: 200,
        message: "Reply Locker successfully",
    }
    return res.status(200).json(responseMap);

});

router.post('/submit-locker', async (req, res) => {
    const studentId = req.body.studentId;
    const lockerId = req.body.lockerId;
    const student = await db.student.findOne({
        where: {
            id: studentId,
            active: 1,
            deleted: 0,
        }
    });

    if (!student) {
        return res.json(
            {
                status: 404,
                message: 'Student Not Found'
            }
        );
    }

    const studentLocker = await db.student_lockers.findOne(
        {
            where: {
                studentId: studentId
            },
            include: [
                {
                    model: db.locker,
                    as: 'locker',
                }
            ],

        }
    );


    if (studentLocker) {
        return res.json(
            {
                status: 400,
                message: 'Student Not Found'
            }
        );
    }

    const locker = await db.locker.findOne(
        {
            where: {
                id: lockerId,
                status: 1
            }
        }
    );
    if (!locker) {
        return res.json(
            {
                status: 404,
                message: 'Locker Not Found'
            }
        );
    }
    await db.student_lockers.create({
        studentId: studentId,
        lockerId: lockerId
    });

    await db.locker.update(
        { status: 0 },
        { where: { id: lockerId } }
    )
    const responseMap = {
        status: 200,
        message: "Submit Locker successfully",
        locker: locker
    }
    return res.json(responseMap);
});

router.post('/reply-locker', async (req, res) => {
    const studentId = req.body.studentId;
    const studentLockers = await db.student_lockers.findOne({
        where: { studentId: studentId },
        include: [
            {
                model: db.locker, // include the LockerRole model
                as: 'locker', // set the alias for the LockerRole model
            }
        ],
    });
    if (!studentLockers) {
        return res.status(400).json(
            {
                status: 404,
                message: 'Student Lockers Not Found'
            }
        );
    }
    await db.student_lockers.destroy({
        where: { studentId: studentId }
    })
    await db.locker.update(
        { status: 1 },
        { where: { id: studentLockers.locker.id } }
    )
    const responseMap = {
        status: 200,
        message: "Reply Locker successfully",
        locker: studentLockers.locker
    }
    return res.status(201).json(responseMap);
});


router.post('/submit-work', async (req, res) => {
    const lockerId = req.body.lockerId;
    const lockerProfessors = await db.locker_professors.findAll({
        where: {
            lockerId: lockerId
        }
    });
    if (!lockerProfessors.length) {
        return res.json(
            {
                status: 404,
                message: 'locker Professors Not Found'
            }
        );
    }
    const result = await lockerProfessors.find(({ password }) => password === req.body.password);
    console.log(result);
    if (!result) {
        return res.json(
            {
                status: 400,
                message: 'Password Not Found'
            }
        );
    }

    return res.json({
        status: 200,
        message: 'login locker',
        locker: await db.locker.findOne({
            where: { id: lockerId }
        })
    })

})


router.post('/reply-works', async (req, res) => {
    const lockerId = req.body.lockerId;
    const lockerProfessors = await db.locker_replywork.findAll({
        where: {
            lockerId: lockerId
        }
    });
    if (!lockerProfessors.length) {
        return res.json(
            {
                status: 404,
                message: 'locker reply works Not Found'
            }
        );
    }
    const result = await lockerProfessors.find(({ password }) => password === req.body.password);
    if (!result) {
        return res.json(
            {
                status: 400,
                message: 'Password Not Found'
            }
        );
    }

    return res.json({
        status: 200,
        message: 'login locker',
        locker: await db.locker.findOne({
            where: { id: lockerId }
        })
    })

})



module.exports = router