import cloudinary from "../config/cloudinary.js";
import fs from "fs";

async function uploadToCloudinary(filePath, type = "raw") {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "embrodivine",
      resource_type: type, // 👈 "raw" for PDF
      access_mode: "public",
      use_filename: true,
      unique_filename: true,
    });

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

export default uploadToCloudinary;
