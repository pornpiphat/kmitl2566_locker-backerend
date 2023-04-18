const router = require('express').Router()
const { Sequelize, Op } = require('sequelize');
const db = require("../config/db.config");


router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const admin = await db.admin.findOne({
        where: {
            username: username,
            password: password
        }
    });
    if (!admin) {
        return res.json(
            {
                status: 404,
                message: 'Admin Not Found'
            }
        );
    }
    const responseMap = {
        status: 200,
        message: "Admin login successfully",
    }
    return res.json(responseMap);
});



module.exports = router;