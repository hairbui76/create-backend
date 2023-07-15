const fastify = require("fastify");
const cookie = require("@fastify/cookie");
const cors = require("@fastify/cors");
const fastifyMultipart = require("@fastify/multipart");
const { errorHandler, notFoundHandler } = require("#middlewares");

const { db, config, route } = require("#configs");

/**
 *
 * @param {*} opts
 * @returns {import("fastify").FastifyInstance}
 */
const appInit = async (opts = {}) => {
	const app = fastify(opts);

	/* ---------- add multipart support (form-data) --------- */
	app.register(fastifyMultipart, {
		addToBody: true,
	});

	/* -------------------- register cors ------------------- */
	app.register(cors, config.CORS);

	/* ------------------- register cookie ------------------ */
	app.register(cookie, {
		secret: config.COOKIE.SECRET,
		parseOptions: {},
	});

	/* ----------------- connect to database ---------------- */
	await app.register(db);

	app.addHook("onRequest", (request, _reply, done) => {
		const { cookies } = request;
		const signedCookies = {};
		for (const key in cookies) {
			signedCookies[key] = request.unsignCookie(cookies[key]).value;
		}
		request.signedCookies = signedCookies;
		done();
	});

	/* -------------------- setup routes -------------------- */
	app.register(route);

	/* --------------- not found route handler -------------- */
	app.setNotFoundHandler(notFoundHandler);
	/* -------------------- error handler ------------------- */
	app.setErrorHandler(errorHandler);

	return app;
};

module.exports = appInit;
