const status = require("http-status");
const { ApiError } = require("#utils");

const errorHandler = (err, request, reply) => {
	if (err instanceof ApiError) {
		return reply.code(err.statusCode).send({ message: err.message });
	}
	return reply
		.code(status.INTERNAL_SERVER_ERROR)
		.send({ message: err.message });
};

module.exports = errorHandler;
