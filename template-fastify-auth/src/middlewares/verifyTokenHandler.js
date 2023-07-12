const { ApiError } = require("#utils");
const paseto = require("#configs/paseto");
const { TOKEN } = require("#configs/config");
const redis = require("#configs/redis");
const status = require("http-status");

const verifyTokenHandler = async (request, _reply) => {
	const accessTokenCookie = request.cookies.token;
	if (!accessTokenCookie) {
		const refreshTokenCookie = request.cookies.refreshToken;
		if (!refreshTokenCookie)
			throw new ApiError(status.UNAUTHORIZED, "Unauthorized");
		const refreshTokenSigned = request.unsignCookie(refreshTokenCookie);
		const refreshToken = refreshTokenSigned.value;
		const payload = await paseto.decode(refreshToken, TOKEN.REFRESH_SECRET);
		const { redisRefreshId, ...info } = payload;
		const isExist = await redis.get(redisRefreshId);
		if (!isExist)
			throw new ApiError(status.UNAUTHORIZED, "Refresh token is invalid");
		request.user = info;
		request.resetAccess = true;
		return;
	}
	const accessTokenSigned = request.unsignCookie(request.cookies.token);
	const accessToken = accessTokenSigned.value;
	const payload = await paseto.decode(accessToken, TOKEN.SECRET);
	const { redisAccessId, ...info } = payload;
	const isExist = await redis.get(redisAccessId);
	if (!isExist) throw new ApiError(status.UNAUTHORIZED, "Token is invalid");
	request.user = info;
};

module.exports = { verifyTokenHandler };
