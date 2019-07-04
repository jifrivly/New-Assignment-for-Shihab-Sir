const express = require("express");
const passport = require("passport");

const adminModel = require("./adminModel");

const admin = express.Router();

admin.post("/signup", (req, res) => {
    var newAdmin = new adminModel({
        email: req.body.email,
        password: req.body.password
    });
    newAdmin
        .save()
        .then(admin => {
            res.status(200).json({
                success: true,
                message: "User is registered Successfully...",
                admin: admin
            });
        })
        .catch(err => {
            res.status(404).json({
                success: false,
                message: "An error occurred, Not registered...",
                error: err
            });
        });
});

admin.get("/login", (req, res) => {
    res.send("Login here");
});

admin.post(
    "/login",
    passport.authenticate("local", {
        session: false,
        failureRedirect: "/admin/login"
    }),
    (req, res) => {
        console.log("post admin route working");
    }
);

admin.get("/dashboard", (req, res) => {
    res.send("Dashboard working");
});

// admin.get("/logout",(req,res)=>{})

module.exports = admin;
