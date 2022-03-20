require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", usersRouter);

const db = require("./database");
db.sequelize.sync()
    .then(() => console.log("Database sync"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.json({ message: "Welcome." });
});

module.exports = app;
