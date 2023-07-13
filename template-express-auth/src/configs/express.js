const express = require("express");
const catchAsync = require("#utils/catchAsync");

const originalRouter = express.Router;
express.Router = function () {
	const router = originalRouter.call(this);

	const methods = ["get", "post", "put", "patch", "delete", "all"];

	methods.forEach((method) => {
		const originalMethod = router[method];

		router[method] = function (path, ...handlers) {
			const newHandlers = handlers.map((handler) => catchAsync(handler));
			return originalMethod.call(this, path, ...newHandlers);
		};
	});

	return router;
};

module.exports = express;
