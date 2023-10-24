const db = require("./db");
const config = require("./config");
const logger = require("./logger");
const route = require("./route");
const password = require("./password");
const paseto = require("./paseto");
const redis = require("./redis");
const cloudinary = require("./cloudinary");

module.exports = {
	db,
	config,
	logger,
	route,
	password,
	paseto,
	redis,
	cloudinary,
};
