const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to home, Use another routes to get an output" })
});

module.exports = router;