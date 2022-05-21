const mongoose = require("mongoose");
const config = require("./config");

const db = async () => {
	try {
		await mongoose.connect(config.DBUri);
		// eslint-disable-next-line
		// require("../../insertDB");
		// eslint-disable-next-line
		console.log("connected to mongodb");
	} catch (err) {
		// eslint-disable-next-line
		console.log(err);
	}
};

module.exports = db;
