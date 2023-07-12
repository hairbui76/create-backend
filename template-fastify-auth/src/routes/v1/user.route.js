const { verifyTokenHandler } = require("#middlewares/verifyTokenHandler");
const userCtl = require("#controllers/user.controller");

const userRoute = (fastify, _opts, done) => {
	fastify.get("/info", { preHandler: verifyTokenHandler }, userCtl.getUserInfo);
	fastify.post(
		"/disable",
		{ preHandler: verifyTokenHandler },
		userCtl.disableUser
	);
	done();
};

module.exports = userRoute;
