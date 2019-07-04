const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");


const app = express();


// DB Configuration
mongoose.connect("mongodb://localhost:27017/assignmentDB")
    .then(() => {
        console.log(chalk.blue("Database Connection successfull..."));
    })
    .catch((err) => {
        console.log(`Databse Connection Error : ${err}`);
    });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// passport configuration
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use("/admin", require("./admin/admin"));

app.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Welcome to home, Use another routes to get an output" });
});



port = process.env.PORT || 4545;
app.listen(port, () => {
    console.log(chalk.green(`Backend working well in port ${port}...`));
});