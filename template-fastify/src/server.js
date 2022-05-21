const appInit = require("./app");
const { config, logger } = require("#configs");

const server = appInit({ logger });

server.listen(
	config.BASE.PORT || 5000,
	config.BASE.HOSTNAME,
	(err, address) => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		console.log(`server listening on ${address}`);
	}
);
