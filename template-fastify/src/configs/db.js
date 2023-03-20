const mongoose = require("mongoose");
const config = require("./config");

const db = async () => {
	mongoose.set("strictQuery", true);
	// console.log(config.DBUri);
	await mongoose.connect(config.DBUri);
	console.log("connected to mongodb");
};

module.exports = db;
