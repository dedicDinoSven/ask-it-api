require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") app.use(cors("*"));
else app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/users", require("./routes/users"));
app.use("/api", require("./routes/auth"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/answers", require("./routes/answers"));
app.use("/api/ratings", require("./routes/ratings"));

const db = require("./database");
db.sequelize
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
} else {
    app.use(express.static(path.join(__dirname, "/client/public")));

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "public", "index.html"));
    });
}

module.exports = app;
