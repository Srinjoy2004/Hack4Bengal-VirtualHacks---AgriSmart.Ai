const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/logincontroller");

router.post("/login", loginUser);

module.exports = router;
