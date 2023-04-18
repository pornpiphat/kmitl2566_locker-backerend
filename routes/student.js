const router = require('express').Router()
const db = require("../config/db.config");


router.get('/', async (req, res,) => {
    const info = await db.student.findAll({
        where: {
            active: true,
            deleted: false
        }
    });
    return res.status(200).json(info)
});



router.post('/update', async (req, res) => {
    const id = req.body.id;
    const firstname = req.body.firstname;
    const lanstname = req.body.lanstname;
    const studentCode = req.body.studentCode;
    const student = await db.student.findOne(
        {
            where: {
                id: id
            }
        }
    );
    if (!student) {
        return res.json(
            {
                status: 404,
                message: 'Student Not Found'
            }
        );
    }
    await db.student.update({
        firstname: firstname,
        lanstname: lanstname,
        student_code: studentCode,
        updatedBy: 'admin'
    }, {
        where: { id: id }
    })

    return res.status(200).json({
        status: 200,
        message: 'Updated Student Successfully'
    });
});


router.post('/delete', async (req, res) => {
    const id = req.body.id;
    const student = await db.student.findOne(
        {
            where: {
                id: id
            }
        }
    );
    if (!student) {
        return res.json(
            {
                status: 404,
                message: 'Student Not Found'
            }
        );
    }
    await db.student.update({
        active: 0,
        deleted: 1,
        updatedBy: 'admin'
    }, {
        where: { id: id }
    })

    return res.status(200).json({
        status: 200,
        message: 'delete Student Successfully'
    });
});



router.post('/chark-student', async (req, res) => {
    const studentCode = req.body.studentCode;
    const student = await db.student.findOne(
        {
            where: {
                student_code: studentCode,
                active: 0,
                deleted: 1,
            }
        }
    );
    if (!student) {
        return res.json(
            {
                status: 404,
                message: 'Student Not Found'
            }
        );
    }

    const resData = {
        status: 200,
        id: student.id,
        studentCode: student.student_code,
        firstname: student.firstname,
        lanstname: student.lanstname,
        function: '',
        locker: null
    };
    const studentLocker = await db.student_lockers.findOne(
        {
            where: {
                studentId: student.id
            },
            include: [
                {
                    model: db.locker,
                    as: 'locker',
                }
            ],
        }
    );
    if (!studentLocker) {
        resData.function = 'locker'
    } else {
        resData.locker = studentLocker.locker
        resData.function = 'return'
    }
    return res.status(200).json(resData);
});



// router.post('/submit', async (req, res) => {

// })




module.exports = router