const status = require("http-status");
const { ApiError } = require("#utils");

const errorHandler = (err, req, res, _next) => {
	console.err(err);
	if (err instanceof ApiError) {
		return res.status(err.statusCode).send({ message: err.message });
	}
	return res
		.status(status.INTERNAL_SERVER_ERROR)
		.send({ message: err.message });
};

module.exports = errorHandler;
