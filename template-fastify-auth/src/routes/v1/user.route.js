const { verifyTokenHandler } = require("#middlewares/verifyTokenHandler");
const userCtl = require("#controllers/user.controller");

const userRoute = (fastify, _opts, done) => {
	fastify.get("/info", { preHandler: verifyTokenHandler }, userCtl.getUserInfo);
	fastify.put(
		"/info",
		{ preHandler: verifyTokenHandler },
		userCtl.updateUserInfo
	);
	fastify.post(
		"/disable",
		{ preHandler: verifyTokenHandler },
		userCtl.disableUser
	);
	fastify.delete(
		"/delete",
		{ preHandler: verifyTokenHandler },
		userCtl.deleteUser
	);
	done();
};

module.exports = userRoute;
