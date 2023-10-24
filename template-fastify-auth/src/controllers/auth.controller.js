const { ENV } = require("#configs/config");
const authService = require("#services/auth.service");

const auth = async (request, reply) => {
	if (request.resetAccess) {
		const { accessToken, accessExp } = await authService.prepareAccessToken(
			request.user
		);
		return reply
			.cookie("token", accessToken, {
				path: "/",
				signed: true,
				secured: ENV === "production",
				expires: accessExp,
			})
			.send({
				message: "Hello World",
				info: request.user,
			});
	}
	return reply.send({ message: "Hello World", info: request.user });
};

const login = async (request, reply) => {
	const { username, password } = request.body;
	const user = await authService.loginByUsername(username, password);
	const { accessToken, accessExp, refreshToken, refreshExp } =
		await authService.prepareToken(user.getPublicInfo());
	console.log(accessToken);
	return reply
		.cookie("token", accessToken, {
			path: "/",
			signed: true,
			secured: ENV === "production",
			expires: accessExp,
		})
		.cookie("refreshToken", refreshToken, {
			path: "/",
			signed: true,
			secured: ENV === "production",
			expires: refreshExp,
		})
		.send({ message: "Login success" });
};

const register = async (request, reply) => {
	const user = await authService.register(request.body);
	const [{ accessToken, accessExp, refreshToken, refreshExp }] =
		await Promise.all([
			authService.prepareToken(user.getPublicInfo()),
			user.save(),
		]);
	return reply
		.cookie("token", accessToken, {
			path: "/",
			signed: true,
			secured: ENV === "production",
			expires: accessExp,
		})
		.cookie("refreshToken", refreshToken, {
			path: "/",
			signed: true,
			secured: ENV === "production",
			expires: refreshExp,
		})
		.send({ message: "Register success" });
};

const logout = async (request, reply) => {
	const { token, refreshToken } = request.signedCookies;
	await authService.logout(token, refreshToken);
	return reply
		.cookie("token", "", { path: "/" })
		.cookie("refreshToken", "", { path: "/" })
		.send({ message: "Logout success" });
};

module.exports = {
	auth,
	login,
	register,
	logout,
};
