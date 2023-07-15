const { User } = require("#models");
const userService = require("#services/user.service");

const getUserInfo = async (request, reply) => {
	const user = await User.findById(request.user.id);
	return reply.send({
		user: user.getPrivateInfo(),
	});
};

const updateUserInfo = async (request, reply) => {
	const user = await userService.updateUserInfo(request.user.id, request.body);
	return reply.send({
		message: "Updated user successfully",
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

const deleteUser = async (request, reply) => {
	const id = request.user.id;
	await Promise.all([
		userService.deleteUserById(id),
		userService.removeUserTokenById(id),
	]);
	return reply
		.cookie("token", "", { path: "/" })
		.cookie("refreshToken", "", { path: "/" })
		.send({
			message: "Deleted user successfully",
		});
};

module.exports = {
	getUserInfo,
	disableUser,
	deleteUser,
	updateUserInfo,
};
