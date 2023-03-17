const { catchAsync } = require("#utils");

/**
 * @param {Object} app express application
 */
const routes = (app) => {
	app.get(
		"/",
		catchAsync((req, res) => {
			return res.send("Hello world!");
		})
	);
};

module.exports = routes;
