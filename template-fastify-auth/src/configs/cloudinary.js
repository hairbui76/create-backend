const cloudinary = require("cloudinary").v2;
const { CLOUDINARY } = require("./config");

cloudinary.config({
	cloud_name: CLOUDINARY.CLOUD_NAME,
	api_key: CLOUDINARY.API_KEY,
	api_secret: CLOUDINARY.API_SECRET,
});

const upload = async (img) => {
	const mimetype = img.mimetype;
	const base64 = (await img.toBuffer()).toString("base64");
	const res = await cloudinary.uploader.upload(
		`data:${mimetype};base64,${base64}`,
		{
			folder: `resources/imgs`,
			resource_type: "auto",
		}
	);
	return res.url;
};

module.exports = {
	upload,
};
