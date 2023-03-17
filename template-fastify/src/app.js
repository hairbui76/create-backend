const fastify = require("fastify");
const cookie = require("@fastify/cookie");
const cors = require("@fastify/cors");
const fastifyMultipart = require("@fastify/multipart");
const { errorHandler, notFoundHandler } = require("#middlewares");

const { db, config } = require("#configs");

/**
 *
 * @param {*} opts
 * @returns {import("fastify").FastifyInstance}
 */
const appInit = (opts = {}) => {
	const app = fastify(opts);

	/* ---------- add multipart support (form-data) --------- */
	app.register(fastifyMultipart, {
		addToBody: true,
	});

	/* -------------------- register cors ------------------- */
	app.register(cors, {
		origin: true,
		credentials: true,
	});

	/* ------------------- register cookie ------------------ */
	app.register(cookie, {
		secret: config.COOKIE.SECRET,
		parseOptions: {},
	});

	/* ----------------- connect to database ---------------- */
	app
		.register(db)
		.then(() => {
			console.log("connected to mongodb");

			/* ----------------- start the server ----------------- */
			app.listen(
				{ port: config.BASE.PORT || 5000, host: config.BASE.HOSTNAME },
				(err, address) => {
					if (err) {
						console.log(err);
						process.exit(1);
					}
					console.log(`server listening on ${address}`);
				}
			);
		})
		.catch((err) => {
			console.log(err);
			process.exit(1);
		});

	/* -------------------- setup routes -------------------- */
	app.get("/", async (req, res) => {
		return res.send("Hello world!");
	});

	/* --------------- not found route handler -------------- */
	app.setNotFoundHandler(notFoundHandler);
	/* -------------------- error handler ------------------- */
	app.setErrorHandler(errorHandler);

	return app;
};

module.exports = appInit;
