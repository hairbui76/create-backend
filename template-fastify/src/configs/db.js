const mongoose = require("mongoose");
const config = require("./config");

const db = async () => {
	try {
		mongoose.set("strictQuery", true);
		await mongoose.connect(config.DBUri);
		console.log("connected to mongodb");
	} catch (err) {
		// eslint-disable-next-line
		console.log(err);
	}
};

module.exports = db;
