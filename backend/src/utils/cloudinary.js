require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const handleUploadImageCloudinary = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: process.env.FOLDER,
    });
    return res;
  } catch (error) {
    console.log("cloudinary", error);
  }
};

module.exports = { handleUploadImageCloudinary };
