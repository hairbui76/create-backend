const { User } = require("#models");
const userService = require("#services/user.service");

const getUserInfo = async (req, res) => {
	const user = await User.findById(req.user.id);
	return res.send({
		user: user.getPrivateInfo(),
	});
};

const updateUserInfo = async (req, res) => {
	const id = req.user.id;
	const user = await userService.updateUserInfo(id, req.body);
	return res.send({
		message: "Updated user successfully",
		user: user.getPrivateInfo(),
	});
};

const disableUser = async (req, res) => {
	const id = req.user.id;
	await Promise.all([
		userService.disableUserById(id),
		userService.removeUserTokenById(id),
	]);
	return res.clearCookie("token").clearCookie("refreshToken").send({
		message: "Disabled user successfully",
	});
};

const deleteUser = async (req, res) => {
	const id = req.user.id;
	await Promise.all([
		userService.deleteUserById(id),
		userService.removeUserTokenById(id),
	]);
	return res.clearCookie("token").clearCookie("refreshToken").send({
		message: "Deleted user successfully",
	});
};

module.exports = {
	getUserInfo,
	disableUser,
	deleteUser,
	updateUserInfo,
};
