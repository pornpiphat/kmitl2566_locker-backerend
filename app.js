const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var cors = require('cors');
const db = require("./config/db.config");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello! Node.js");
});


app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Hello! Node.js");
});

app.use('/student', require('./routes/student'));
app.use('/locker', require('./routes/locker'));
app.use('/professor', require('./routes/professor'));
app.use('/admin', require('./routes/admin'));
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("Starting node.js at port " + port);
    });
});
