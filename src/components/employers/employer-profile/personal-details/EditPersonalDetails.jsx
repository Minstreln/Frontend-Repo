/* eslint-disable react/prop-types */

import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import userImage from "@/assets/user.png";
import { cloudinaryConfig } from "../../../../config/config";
import DialogFormButtons from "../../../DialogFormButtons";
import { useUpdateEmployerPersonalDetails } from "../../../../hooks/useEmployerPersonalDetails";

const EditPersonalDetails = ({ personalDetails }) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    personalDetails?.profileImage
  );

  const updatePersonalDetailsMutation = useUpdateEmployerPersonalDetails();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      middleName: personalDetails?.middleName,
      location: personalDetails?.location,
      phoneNumber: personalDetails?.phoneNumber,
      profileImage: personalDetails?.profileImage,
      github: personalDetails?.github,
      linkedin: personalDetails?.linkedin,
      portfolioSite: personalDetails?.portfolioSite,
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    reset();
    setPreviewImage(personalDetails?.profileImage);
  };

  const onSubmit = async (data) => {
    try {
      let profileImageUrl = personalDetails.profileImage;

      // Upload new certificate to Cloudinary
      if (data.profileImage && data.profileImage[0] instanceof File) {
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", data.profileImage[0]);
        cloudinaryFormData.append(
          "upload_preset",
          cloudinaryConfig.uploadPreset
        );
        cloudinaryFormData.append("api_key", cloudinaryConfig.apiKey);

        const results = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/raw/upload`,
          cloudinaryFormData
        );

        if (!results.data.secure_url) {
          throw new Error("Failed to upload image");
        }
        profileImageUrl = results.data.secure_url;
        setPreviewImage(results.data.secure_url);
      }

      // submit form data
      const formData = { ...data, profileImage: profileImageUrl };

      await updatePersonalDetailsMutation.mutateAsync({
        personalDetailsId: personalDetails._id,
        personalData: formData,
      });

      toast.success("Profile updated successfully");
      reset();
      setPreviewImage(null);
      setOpen(false);
    } catch (error) {
      toast.error(error.message || "Error updating profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white bg-primary" variant="contained">
          <Edit className="h-4 w-4 mr-2" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-800">
            Edit Personal Details
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 overflow-y-scroll max-h-[400px] pr-4">
            <div className="w-full flex flex-col gap-2">
              <Label
                htmlFor="profileImage"
                className="text-gray-900 text-[16px]"
              >
                Profile Image
              </Label>
              <div className="w-full flex flex-col sm:flex-row gap-5 items-end justify-start">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="profile image"
                    className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-md"
                  />
                ) : (
                  <img
                    src={userImage}
                    alt="profile image"
                    className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-md"
                  />
                )}
                <Controller
                  name="profileImage"
                  control={control}
                  rules={{
                    required: "Profile Image is required",
                    validate: (value) => {
                      if (
                        value[0] instanceof File ||
                        personalDetails?.profileImage
                      ) {
                        return true;
                      }
                      return "Profile Image is required";
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        handleFileChange(e);
                      }}
                      className="focus-visible:ring-0 h-10 max-w-sm"
                    />
                  )}
                />
              </div>
              {errors.profileImage && (
                <span className="text-red-500 text-sm">
                  Profile Image is required
                </span>
              )}
            </div>

            <div className="w-full flex flex-col md:flex-row gap-5">
              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="middleName"
                  className="text-gray-900 text-[16px]"
                >
                  Middle Name
                </Label>
                <Input
                  type="text"
                  id="middleName"
                  placeholder="Middle Name"
                  {...register("middleName")}
                  className="focus-visible:ring-0 !py-5"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-gray-900 text-[16px]"
                >
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  {...register("phoneNumber", {
                    pattern: {
                      value: /^(\+\d{1,3}[- ]?)?\d{10,14}$/,
                      message: "Invalid phone number format",
                    },
                  })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-5">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="linkedin" className="text-gray-900 text-[16px]">
                  LinkedIn Profile URL
                </Label>
                <Input
                  type="text"
                  id="linkedin"
                  placeholder="https://www.linkedin.com/in/username"
                  {...register("linkedin", {
                    pattern: {
                      value:
                        /^https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[\w\\-]+\/?$/,
                      message: "Please enter a valid LinkedIn profile URL,",
                    },
                  })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.linkedin && (
                  <span className="text-red-500 text-sm">
                    {errors.linkedin.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="location" className="text-gray-900 text-[16px]">
                  Location
                </Label>
                <Input
                  type="text"
                  id="location"
                  placeholder="City, Country or Region"
                  {...register("location")}
                  className="focus-visible:ring-0 !py-5"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="github" className="text-gray-900 text-[16px]">
                  GitHub Profile URL
                </Label>
                <Input
                  type="text"
                  id="github"
                  placeholder="https://github.com/username"
                  {...register("github", {
                    pattern: {
                      value:
                        /^https:\/\/github\.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
                      message: "Please enter a valid GitHub profile URL",
                    },
                  })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.github && (
                  <span className="text-red-500 text-sm">
                    {errors.github.message}
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
                  placeholder="https://example.com"
                  {...register("portfolioSite")}
                  className="focus-visible:ring-0 !py-5"
                />
              </div>
            </div>
          </div>
          <DialogFormButtons isSubmitting={isSubmitting} reset={resetForm} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPersonalDetails;
