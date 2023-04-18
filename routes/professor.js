const router = require('express').Router()
const db = require("../config/db.config");


router.get('/', async (req, res,) => {
    const info = await db.professors.findAll();
    return res.status(200).json(info)
});


router.post('/submit', async (req, res) => {
    const info = await db.locker.findAll({
        include: [
            {
                model: db.lockerRole, // include the LockerRole model
                as: 'lockerRole', // set the alias for the LockerRole model
            },
            {
                model: db.lockerRole, // include the LockerRole model
                as: 'lockerRole', // set the alias for the LockerRole model
            },
        ],
    });
    return res.status(200).json(info);
});



module.exports = router