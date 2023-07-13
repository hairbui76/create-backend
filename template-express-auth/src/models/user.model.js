const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
		},
		dOB: Date,
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		methods: {
			getPublicInfo() {
				const { name, username, id } = this;
				return { name, username, id };
			},
			getPrivateInfo() {
				const { name, username, email, phoneNumber, dOB, id } = this;
				return { name, username, email, phoneNumber, dOB, id };
			},
		},
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
