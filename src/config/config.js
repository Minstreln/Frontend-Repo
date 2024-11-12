export const cloudinaryConfig = {
  cloudName: String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME),
  uploadPreset: String(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET),
  apiKey: String(import.meta.env.VITE_CLOUDINARY_API_KEY),
  apiSecret: String(import.meta.env.VITE_CLOUDINARY_API_SECRET),
};

export const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL);
