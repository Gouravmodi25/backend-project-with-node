const cloudinary = require("cloudinary").v2;
const ApiError = require("./ApiError");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

function extractPublicId(url) {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  const publicId = lastPart.split(".")[0];

  return `${publicId}`;
}

const deleteImageOnCloudinary = async (imageUrl) => {
  try {
    const publicId = extractPublicId(imageUrl);

    // delete image old image on cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.log("Image deleted successfully");
    } else if (result.result === "not found") {
      console.log("Image not found. Public ID may be incorrect:", publicId);
    } else {
      console.log("Deletion failed:", result);
    }
  } catch (error) {
    throw new ApiError(500, "Failed to delete image");
  }
};

module.exports = deleteImageOnCloudinary;
