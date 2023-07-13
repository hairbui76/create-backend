const { v1 } = require("#routes");

/**
 * @param {import("express").Application} app express application
 */
const routes = (app) => {
	app.get("/", (req, res) => {
		return res.send("Hello World");
	});
	app.use("/v1", v1);
};

module.exports = routes;
