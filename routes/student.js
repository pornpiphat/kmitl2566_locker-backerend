const router = require('express').Router()
const db = require("../config/db.config");


router.get('/', async (req, res,) => {
    const info = await db.student.findAll();
    return res.status(200).json(info)
});


router.post('/chark-student', async (req, res) => {
    const studentCode = req.body.studentCode;
    const student = await db.student.findOne(
        {
            where: {
                student_code: studentCode
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