const redis = require("#configs/redis");
const User = require("#models/user.model");

const disableUserById = (id) => User.findByIdAndUpdate(id, { disabled: true });

const removeUserTokenById = (id) => redis.del(`ac_${id}`, `rf_${id}`);

module.exports = {
	disableUserById,
	removeUserTokenById,
};
