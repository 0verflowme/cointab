const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const passport = require("passport");
const passportjwt = require("../config/passport-jwt-strategy");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000, // 24 hrs
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
});

router.use("/login", limiter);
router.get("/", controller.home);
router.post("/signup", controller.createUser);
router.post("/login", controller.login);
router.get(
	"/dashboard",
	passport.authenticate("jwt", { session: false }),
	controller.dashboard
);

module.exports = router;
