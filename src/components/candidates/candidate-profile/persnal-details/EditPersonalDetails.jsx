/* eslint-disable react/prop-types */

import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import userImage from "@/assets/user.png";
import { Textarea } from "../../../ui/textarea";
import { cloudinaryConfig } from "../../../../config/cloudinary";

const EditPersonalDetails = ({ personalDetails, refetch }) => {
  const [previewImage, setPreviewImage] = useState(
    personalDetails?.profileImage
  );
  const [open, setOpen] = useState(false);

  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      middleName: personalDetails?.middleName,
      profileImage: personalDetails?.profileImage,
      location: personalDetails?.location,
      aboutMe: personalDetails?.aboutMe,
      linkedin: personalDetails?.linkedin,
      github: personalDetails?.github,
      portfolioSite: personalDetails?.portfolioSite,
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setValue("profileImage", file, {
        shouldValidate: true,
        shouldDirty: true,
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (data) => {
    try {
      let formData;
      let newUploadedUrl;

      // Upload certificate to Cloudinary
      if (data.profileImage) {
        const cloudinaryFormData = new FormData();

        cloudinaryFormData.append("file", data.profileImage);
        cloudinaryFormData.append(
          "upload_preset",
          cloudinaryConfig.uploadPreset
        );
        cloudinaryFormData.append("api_key", cloudinaryConfig.apiKey);

        const results = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/raw/upload`,
          cloudinaryFormData
        );

        if (results.data.secure_url === null) {
          throw new Error("Failed to image");
        }
        newUploadedUrl = results.data.secure_url;
        setPreviewImage(newUploadedUrl);
      }

      // submit form data

      if (newUploadedUrl) {
        formData = { ...data, profileImage: newUploadedUrl };
      } else {
        formData = { ...data, profileImage: personalDetails?.profileImage };
      }

      const response = await axios.patch(
        `https://lysterpro-backend.onrender.com/api/v1/jobseeker/update-personal-detail/${personalDetails._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Profile updated successfully");
        reset();
        setPreviewImage(null);
        setOpen(false);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating profile:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen} className="w-full" size="xl">
      <DialogTrigger asChild>
        <Button
          className="text-white bg-primary mt-6 text-lg"
          variant="contained"
          size={"lg"}
        >
          <Edit className="h-5 w-5 mr-2" /> Edit Personal Details
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-800">
            Edit Personal Details
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 overflow-y-scroll max-h-[400px] pr-2">
            <div className="w-full flex flex-col gap-2">
              <Label
                htmlFor="profileImage"
                className="text-gray-900 text-[16px]"
              >
                Profile Image
              </Label>
              <div className="w-full flex flex-col sm:flex-row gap-5 items-end justify-start">
                {previewImage && (
                  <img
                    src={previewImage || userImage}
                    alt="profile image"
                    className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-md"
                  />
                )}
                <Input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="focus-visible:ring-0 h-10"
                />
              </div>
              {errors.profileImage && (
                <span className="text-red-500 text-sm">
                  Profile Image is required
                </span>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="middleName" className="text-gray-900 text-[16px]">
                Middle Name
              </Label>
              <Input
                type="text"
                id="middleName"
                placeholder="Middle Name"
                defaultValue={personalDetails?.middleName || ""}
                {...register("middleName", { required: true })}
                className="focus-visible:ring-0 !py-5"
              />
              {errors.middleName && (
                <span className="text-red-500 text-sm">
                  Middle Name is required
                </span>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="linkedin" className="text-gray-900 text-[16px]">
                Linked Profile URL
              </Label>
              <Input
                type="text"
                id="linkedin"
                placeholder="Linked Profile URL"
                defaultValue={personalDetails?.linkedin || ""}
                {...register("linkedin", { required: true })}
                className="focus-visible:ring-0 !py-5"
              />
              {errors.linkedin && (
                <span className="text-red-500 text-sm">
                  Linked Profile URL is required
                </span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="github" className="text-gray-900 text-[16px]">
                GitHub Profile URL
              </Label>
              <Input
                type="text"
                id="github"
                placeholder="GitHub Profile URL"
                defaultValue={personalDetails?.github || ""}
                {...register("github", { required: true })}
                className="focus-visible:ring-0 !py-5"
              />
              {errors.github && (
                <span className="text-red-500 text-sm">
                  GitHub Profile URL is required
                </span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label
                htmlFor="portfolioSite"
                className="text-gray-900 text-[16px]"
              >
                Portifolio Site URL
              </Label>
              <Input
                type="text"
                id="portfolioSite"
                placeholder="Portifolio Site URL"
                defaultValue={personalDetails?.portfolioSite || ""}
                {...register("portfolioSite")}
                className="focus-visible:ring-0 !py-5"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="location" className="text-gray-900 text-[16px]">
                Location
              </Label>
              <Input
                type="text"
                id="location"
                placeholder="Location"
                defaultValue={personalDetails?.location || ""}
                {...register("location", { required: true })}
                className="focus-visible:ring-0 !py-5"
              />
              {errors.location && (
                <span className="text-red-500 text-sm">
                  Location is required
                </span>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="aboutMe" className="text-gray-900 text-[16px]">
                About Me
              </Label>
              <Textarea
                placeholder="Type something about you here..."
                id="aboutMe"
                defaultValue={personalDetails?.aboutMe || ""}
                {...register("aboutMe", { required: true })}
                className="focus-visible:ring-0 !py-5"
                rows={8}
              />
              {errors.aboutMe && (
                <span className="text-red-500 text-sm">
                  About Me is required
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="!w-full !flex !flex-row !items-center !justify-between pt-5">
            <Button
              variant="outline"
              type="reset"
              size="lg"
              disabled={isSubmitting}
              onClick={() => {
                reset();
                setPreviewImage(personalDetails?.profileImage);
              }}
              className="bg-red-500/90 text-white hover:bg-red-500 hover:text-white font-semibold"
            >
              Reset
            </Button>
            <Button
              variant="default"
              type="submit"
              size="lg"
              className="font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" />
                  Saving...
                </div>
              ) : (
                "Edit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPersonalDetails;
