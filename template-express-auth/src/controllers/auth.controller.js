const { ENV } = require("#configs/config");
const authService = require("#services/auth.service");

const auth = async (req, res) => {
	if (req.resetAccess) {
		const { accessToken, accessExp } = await authService.prepareAccessToken(
			req.user
		);
		return res
			.cookie("token", accessToken, {
				path: "/",
				signed: true,
				secured: ENV === "production",
				expires: accessExp,
			})
			.send({
				message: "Hello World",
				info: req.user,
			});
	}
	return res.send({ message: "Hello World", info: req.user });
};

const login = async (req, res) => {
	const { username, password } = req.body;
	const user = await authService.loginByUsername(username, password);
	const { accessToken, accessExp, refreshToken, refreshExp } =
		await authService.prepareToken(user.getPublicInfo());
	return res
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

const register = async (req, res) => {
	const user = await authService.register(req.body);
	const [{ accessToken, accessExp, refreshToken, refreshExp }] =
		await Promise.all([
			authService.prepareToken(user.getPublicInfo()),
			user.save(),
		]);
	return res
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

const logout = async (req, res) => {
	const { token, refreshToken } = req.signedCookies;
	await authService.logout(token, refreshToken);
	return res
		.clearCookie("token")
		.clearCookie("refreshToken")
		.send({ message: "Logout success" });
};

module.exports = {
	auth,
	login,
	register,
	logout,
};
