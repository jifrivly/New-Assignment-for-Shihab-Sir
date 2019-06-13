const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost:27017/assignmentDB").then(() => {
    console.log(chalk.blue("Database Connection successfull..."))
}).catch((err) => {
    console.log(`Databse Connection Error ${err}`)
})

// routes
app.use('/', require("./index/index"));
app.use('/admin', require("./admin/admin"));



port = process.env.PORT || 4545;
app.listen(port, () => {
    console.log(chalk.green(`Backend working well in port ${port}...`));
});