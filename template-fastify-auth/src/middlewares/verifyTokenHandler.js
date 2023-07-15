const { ApiError } = require("#utils");
const paseto = require("#configs/paseto");
const { TOKEN } = require("#configs/config");
const redis = require("#configs/redis");
const status = require("http-status");

const verifyTokenHandler = async (request, _reply) => {
	const { token, refreshToken } = request.signedCookies;
	if (!token && !refreshToken)
		throw new ApiError(status.UNAUTHORIZED, "Unauthorized");
	if (!token) {
		const payload = await paseto.decode(refreshToken, TOKEN.REFRESH_SECRET);
		const { redisRefreshId, ...info } = payload;
		const isExist = await redis.get(redisRefreshId);
		if (!isExist)
			throw new ApiError(status.UNAUTHORIZED, "Refresh token is invalid");
		const id = redisRefreshId.split("_")[1];
		request.user = { ...info, id };
		request.resetAccess = true;
		return;
	}
	const payload = await paseto.decode(token, TOKEN.SECRET);
	const { redisAccessId, ...info } = payload;
	const isExist = await redis.get(redisAccessId);
	if (!isExist) throw new ApiError(status.UNAUTHORIZED, "Token is invalid");
	const id = redisAccessId.split("_")[1];
	request.user = { ...info, id };
};

module.exports = { verifyTokenHandler };
