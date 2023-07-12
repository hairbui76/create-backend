const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config({ path: path.join(__dirname, "../../.env.example") });
dotenv.config();

const config = {
	BASE: {
		HOSTNAME: process.env.BASE_URL,
		PORT: process.env.BASE_PORT,
	},
	API_VERSION: "v1",
	DB: {
		URL: process.env.MONGOOSE_URL,
		HOST: process.env.MONGOOSE_HOST,
		PORT: process.env.MONGOOSE_PORT,
		DATABASE: process.env.MONGOOSE_DB_NAME,
	},
	CORS: {
		methods: ["GET", "POST", "PATCH", "DELETE"],
		origin: ["localhost:3000", "http://localhost:3000"],
		credentials: true,
		optionsSuccessStatus: 200,
	},
	TOKEN: {
		SECRET: process.env.TOKEN_SECRET,
		REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET,
		TOKEN_EXPIRE_HOURS: process.env.TOKEN_EXPIRE_HOURS,
		REFRESH_TOKEN_EXPIRE_WEEKS: process.env.REFRESH_TOKEN_EXPIRE_WEEKS,
	},
	COOKIE: {
		SECRET: process.env.COOKIE_SECRET,
	},
	ENV: process.env.NODE_ENV || "development",
	REDIS: {
		HOST: process.env.REDIS_HOST,
		PORT: process.env.REDIS_PORT,
	},

	get HttpUrl() {
		return `${this.BASE.HOSTNAME}:${this.BASE.PORT}`;
	},

	get DBUri() {
		return (
			this.DB.URL ||
			`mongodb://${this.DB.HOST}:${this.DB.PORT}/${this.DB.DATABASE}`
		);
	},

	get redisUri() {
		return `redis://${this.REDIS.HOST}:${this.REDIS.PORT}`;
	},
};

module.exports = config;
