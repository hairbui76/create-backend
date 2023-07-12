const v1 = require("##routes/v1");

const route = (fastify, _opts, done) => {
	fastify.get("/", (_request, reply) => {
		return reply.send("Hello world!");
	});
	fastify.register(v1, { prefix: "/v1" });

	done();
};

module.exports = route;
