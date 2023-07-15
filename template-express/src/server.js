const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const pinoHttp = require("pino-http");

const { errorHandler } = require("#middlewares");
const { config, pinocfg, routes, db } = require("#configs");

const app = express();
const logger = pinoHttp(pinocfg);

/* ------------------------ cors ------------------------ */
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --- sanitize mongo queries data (prevent injection) -- */
app.use(mongoSanitize());

/* ------------ Data sanitization against XSS ----------- */
app.use(xss());

/* --------------- compress response body --------------- */
app.use(compression());

/* ----- secure app by setting various HTTP headers ----- */
app.use(helmet());

// use pino logger
app.use(logger);

/* ------------------ routes configure ------------------ */
routes(app);

/* -------------------- error handler ------------------- */
app.use(errorHandler);

/* ----------- connect database before listen ----------- */
db().then(() =>
	app.listen(config.BASE.PORT, async (err) => {
		if (err) console.log(err);
		console.log(`Server is running at http://${config.HttpUrl}`);
	})
);
