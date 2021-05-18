var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var indexRouter = require("./routes/index");
var policyRouter = require("./routes/policy");
let cronPhaseRouter = require("./routes/cronPhase");
var apiResponse = require("./helpers/apiResponse");
var cors = require("cors");
var cron = require("node-cron");
let CronFirstPhase = require("./models/CronFirstPhaseModel");
let CronNextPhase = require("./models/CronNextPhaseModel");

global.__basedir = __dirname + "/..";


// DB connection
var MONGODB_URL = "mongodb://localhost:27017/insuredMine";
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if (process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});

// var db = mongoose.connection;



var app = express();

//don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
// app.use("/api/", apiRouter);
app.use("/policy", policyRouter);
app.use("/cron", cronPhaseRouter);

// throw 404 if URL not found
app.all("*", function (req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});


cron.schedule("* * * * * *", async () => {
	const date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	// var s = date.getSeconds();
	const day = date.getDay();
	let weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	let time = h + ":" + m + ":";
	let getDateFromCronFristPhase = await CronFirstPhase.find({ day: weekday[day], time: time });
	if (getDateFromCronFristPhase) {
		await CronNextPhase.insertMany(getDateFromCronFristPhase);
	}
});

app.use((err, req, res) => {
	if (err.name == "UnauthorizedError") {
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});


app.listen(8080);

module.exports = app;
