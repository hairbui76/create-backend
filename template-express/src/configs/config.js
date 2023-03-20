const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env.example") });

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
		SECRET: `k3.local.${process.env.TOKEN_SECRET}`,
		TOKEN_EXPIRE: process.env.TOKEN_EXPIRE_HOURS * 60 * 60 * 1000,
		RESET_TOKEN_EXPIRE: process.env.TOKEN_VERIFY_EXPIRE_MINUTES * 60 * 1000,
		REFRESH_TOKEN_EXPIRE:
			process.env.REFRESH_TOKEN_EXPIRE_WEEKS * 7 * 24 * 60 * 60 * 1000,
		REFRESH_TOKEN_EXPIRE_WEEKS: process.env.REFRESH_TOKEN_EXPIRE_WEEKS,
	},
	COOKIE: {
		SECRET: process.env.COOKIE_SECRET,
	},
	ENV: process.env.NODE_ENV || "development",

	get HttpUrl() {
		return `${this.BASE.HOSTNAME}:${this.BASE.PORT}`;
	},

	get DBUri() {
		return (
			this.DB.URL ||
			`mongodb://${this.DB.HOST}:${this.DB.PORT}/${this.DB.DATABASE}`
		);
	},
};

module.exports = config;
