const { User } = require("#models");
const cloudinary = require("#configs");
const paseto = require("#configs/paseto");
const redis = require("#configs/redis");
const pw = require("#configs/password");
const { ApiError, date } = require("#utils");
const { TOKEN } = require("#configs/config");
const status = require("http-status");

const prepareAccessToken = async (info) => {
	const { id, ...encodeInfo } = info;
	const redisAccessId = `ac_${id}`;
	const accessToken = await paseto.encode(
		{ ...encodeInfo, redisAccessId },
		TOKEN.SECRET
	);
	const accessExp = date
		.addHours(new Date(), TOKEN.TOKEN_EXPIRE_HOURS)
		.getTime();
	await redis.setex(redisAccessId, accessExp, true);
	return { accessToken, accessExp };
};

const prepareRefreshToken = async (info) => {
	const { id, ...encodeInfo } = info;
	const redisRefreshId = `rf_${id}`;
	const refreshToken = await paseto.encode(
		{ ...encodeInfo, redisRefreshId },
		TOKEN.REFRESH_SECRET
	);
	const refreshExp = date
		.addWeeks(new Date(), TOKEN.REFRESH_TOKEN_EXPIRE_WEEKS)
		.getTime();
	await redis.setex(redisRefreshId, refreshExp, true);
	return { refreshToken, refreshExp };
};

const prepareToken = async (info) => {
	const [accessTokenExp, refreshTokenExp] = await Promise.all([
		prepareAccessToken(info),
		prepareRefreshToken(info),
	]);
	const { accessToken, accessExp } = accessTokenExp;
	const { refreshToken, refreshExp } = refreshTokenExp;
	return { accessToken, accessExp, refreshToken, refreshExp };
};

const register = async (info) => {
	const { avatar, thumbnail } = info;
	const newUser = {
		name: info.name.value,
		username: info.username.value,
		email: info.email.value,
		phoneNumber: info.phoneNumber.value,
		dOB: info.dOB.value,
		address: info.address.value,
	};
	if (avatar && thumbnail) {
		[newUser.avatarUrl, newUser.thumbnailUrl] = await Promise.all([
			cloudinary.upload(avatar),
			cloudinary.upload(thumbnail),
		]);
	} else if (avatar) {
		newUser.avatarUrl = await cloudinary.upload(avatar);
	} else if (thumbnail) {
		newUser.thumbnailUrl = await cloudinary.upload(thumbnail);
	}
	console.log(newUser);
	newUser.password = await pw.hash(info.password.value);
	const user = new User(newUser);
	return user;
};

const loginByUsername = async (username, password) => {
	const user = await User.findOne({ username });
	if (!user) throw new ApiError(status.NOT_FOUND, "User not found");
	const isMatch = await pw.verify(password, user.password);
	if (!isMatch)
		throw new ApiError(
			status.NOT_ACCEPTABLE,
			"Username or password is incorrect"
		);
	return user;
};

const logout = async (token, refreshToken) => {
	if (!token && !refreshToken) return;
	if (token && refreshToken) {
		const [{ redisAccessId }, { redisRefreshId }] = await Promise.all([
			paseto.decode(token, TOKEN.SECRET),
			paseto.decode(refreshToken, TOKEN.REFRESH_SECRET),
		]);
		return redis.del(redisAccessId, redisRefreshId);
	}
	if (token) {
		const { redisAccessId } = await paseto.decode(token, TOKEN.SECRET);
		return redis.del(redisAccessId);
	}
	if (refreshToken) {
		const { redisRefreshId } = await paseto.decode(
			refreshToken,
			TOKEN.REFRESH_SECRET
		);
		return redis.del(redisRefreshId);
	}
};

module.exports = {
	prepareAccessToken,
	prepareRefreshToken,
	prepareToken,
	register,
	loginByUsername,
	logout,
};
