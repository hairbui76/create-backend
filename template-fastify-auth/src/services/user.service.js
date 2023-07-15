const redis = require("#configs/redis");
const User = require("#models/user.model");
const { ApiError } = require("#utils");
const status = require("http-status");

const disableUserById = (id) => User.findByIdAndUpdate(id, { disabled: true });

const deleteUserById = (id) => User.findByIdAndDelete(id);

const updateUserInfo = async (id, info) => {
	const infoKeys = Object.keys(info);
	const updatableInfo = User.getUpdatableInfo();
	infoKeys.forEach((key) => {
		if (!updatableInfo.includes(key))
			throw new ApiError(status.BAD_REQUEST, `Cannot update ${key} field`);
	});
	return User.findByIdAndUpdate(id, info, { new: true });
};

const removeUserTokenById = (id) => redis.del(`ac_${id}`, `rf_${id}`);

module.exports = {
	disableUserById,
	removeUserTokenById,
	deleteUserById,
	updateUserInfo,
};
