export const cloudinaryConfig = {
  cloudName: String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME),
  uploadPreset: String(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET),
  apiKey: String(import.meta.env.VITE_CLOUDINARY_API_KEY),
};
