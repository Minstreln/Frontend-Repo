import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function deleteCloudinaryFile(
  secureUrl: string,
  cloudinaryConfig: {
    apiSecret: string;
    apiKey: string;
    cloudName: string;
    uploadPreset: string;
  }
) {
  // Extract the public_id and resource_type from the secure URL
  const urlParts = secureUrl.split("/");
  const resourceType = urlParts[urlParts.length - 2]; // e.g., 'image', 'video', 'raw'
  const publicIdWithExtension = urlParts[urlParts.length - 1];
  const publicId = publicIdWithExtension.split(".")[0];

  try {
    // Send the delete request to your backend
    const response = await axios.post("/api/delete-cloudinary-file", {
      publicId,
      resourceType,
      cloudinaryConfig,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error;
  }
}
