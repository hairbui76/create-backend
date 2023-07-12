const { User } = require("#models");
const userService = require("#services/user.service");

const getUserInfo = async (request, reply) => {
	const user = await User.findById(request.user.id);
	return reply.send({
		user: user.getPrivateInfo(),
	});
};

const disableUser = async (request, reply) => {
	const id = request.user.id;
	await Promise.all([
		userService.disableUserById(id),
		userService.removeUserTokenById(id),
	]);
	return reply
		.cookie("token", "", { path: "/" })
		.cookie("refreshToken", "", { path: "/" })
		.send({
			message: "Disabled user successfully",
		});
};

module.exports = {
	getUserInfo,
	disableUser,
};
