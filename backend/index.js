const express = require("express");
const PORT = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const app = express();
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

const routes = require("./routes");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
	session({
		name: "jwt",
		secret: "pwn",
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
		store: new MongoStore({
			mongoUrl:
				"mongodb+srv://0verflowme:9A6YjzxS7NTYyC3b@cluster0.ghy5nv0.mongodb.net/cointab",
			autoRemove: "disabled",
		}),
	})
);

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use("/", routes);

app.listen(PORT, () => {
	console.log("Server Running on PORT:", PORT);
});