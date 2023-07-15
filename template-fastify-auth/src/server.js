const appInit = require("./app");
const { logger, config } = require("#configs");

appInit({ logger })
	.then((app) => {
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
