import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

console.log(process.env.CLOUD_NAME)
console.log(process.env.CLOUD_API_KEY)
console.log(process.env.CLOUD_API_SECRET)


// config (same as your setup)
cloudinary.config({
   cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET,
});

const folderPath = "./images"; // your local images folder

const uploadImages = async () => {
  try {
    const files = fs.readdirSync(folderPath);

    const urls = [];

    for (const file of files) {
      const filePath = path.join(folderPath, file);

      console.log("Uploading:", file);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "amazon", // same as your multer folder
      });

      urls.push(result.secure_url);
    }

    // save URLs
    fs.writeFileSync("imageUrls.json", JSON.stringify(urls, null, 2));

    console.log("✅ Upload complete");
  } catch (err) {
    console.error(err);
  }
};

uploadImages();