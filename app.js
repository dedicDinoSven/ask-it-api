require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", require("./routes/users"));
app.use("/api", require("./routes/auth"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/answers", require("./routes/answers"));

const db = require("./database");
db.sequelize.sync()
    .then(() => console.log("Database sync"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.json({ message: "Welcome." });
});

module.exports = app;
