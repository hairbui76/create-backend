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
		address: String,
		avatarUrl: {
			type: String,
			default:
				"https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
		},
		thumbnailUrl: {
			type: String,
			default:
				"https://previews.123rf.com/images/peshkov/peshkov1903/peshkov190301435/119868636-hand-drawing-creative-eco-globe-sketch-on-white-background-eco-friendly-and-green-concept.jpg",
		},
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

userSchema.statics.getUpdatableInfo = function () {
	return ["name", "username", "email", "phoneNumber", "dOB"];
};

const User = mongoose.model("User", userSchema);

module.exports = User;
