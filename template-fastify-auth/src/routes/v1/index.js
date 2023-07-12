const authRoute = require("./auth.route");
const userRoute = require("./user.route");

const v1 = (fastify, _opts, done) => {
	fastify.register(authRoute, { prefix: "/auth" });
	fastify.register(userRoute, { prefix: "/user" });
	done();
};

module.exports = v1;
