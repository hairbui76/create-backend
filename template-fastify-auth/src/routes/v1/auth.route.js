const { verifyTokenHandler } = require("#middlewares/verifyTokenHandler");
const authCtl = require("#controllers/auth.controller");

const authRoute = (fastify, _opts, done) => {
	fastify.get("/", { preHandler: verifyTokenHandler }, authCtl.auth);
	fastify.post("/login", authCtl.login);
	fastify.post("/register", authCtl.register);
	fastify.post("/logout", authCtl.logout);
	done();
};

module.exports = authRoute;
