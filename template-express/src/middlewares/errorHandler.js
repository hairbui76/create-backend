const status = require("http-status");
const { ApiError } = require("#utils");

const errorHandler = (err, req, res, _next) => {
	if (err instanceof ApiError) {
		return res.code(err.statusCode).send({ message: err.message });
	}
	return res.code(status.INTERNAL_SERVER_ERROR).send({ message: err.message });
};

module.exports = errorHandler;
