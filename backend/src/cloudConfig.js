import cloudinary from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import dotenv from 'dotenv';
 dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true, // Ensures HTTPS is used
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    return {
      folder: 'amazon',
      allowed_formats: ['png', 'jpg', 'jpeg', 'pdf'],
      // public_id: file.originalname.split('.')[0], // Optional: custom public ID
    };
  },
});

export { cloudinary, storage };
