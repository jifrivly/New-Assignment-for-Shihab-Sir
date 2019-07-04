const express = require("express");

const employee = express.Router();

employee.get("/", (req, res) => {
    res.send("employee working well!!");
});

module.exports = employee;