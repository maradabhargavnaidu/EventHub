const express = require("express");
const { authenticateUser } = require("../middlewares/middleware");
const { Profile, login, register } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", Profile);

// router.post('/createevent',)

module.exports = router;
