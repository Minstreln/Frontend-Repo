import { useState } from "react";
import { useCreateEmployerPersonalDetails } from "../../../../hooks/useEmployerPersonalDetails";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import userImage from "@/assets/user.png";
import toast from "react-hot-toast";
import { cloudinaryConfig } from "../../../../config/config";
import axios from "axios";

const PersonalDetailsForm = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const createEmployerDetailsMutation = useCreateEmployerPersonalDetails();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      middleName: "",
      location: "",
      phoneNumber: "",
      profileImage: "",
      github: "",
      linkedin: "",
      portfolioSite: "",
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

  const onSubmit = async (data) => {
    try {
      if (!data.profileImage) return;

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", data.profileImage[0]);
      cloudinaryFormData.append("upload_preset", cloudinaryConfig.uploadPreset);
      cloudinaryFormData.append("api_key", cloudinaryConfig.apiKey);

      const results = await await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        cloudinaryFormData
      );
      if (!results.data.secure_url) {
        throw new Error("Failed to upload profile image");
      }
      setPreviewImage(results.data.secure_url);

      // submit form data
      const formData = { ...data, profileImage: results.data.secure_url };

      await createEmployerDetailsMutation.mutateAsync(formData);

      toast.success("Personal details added successfully");
      reset();
      setPreviewImage(null);
    } catch (error) {
      toast.error(error);
      console.error("Error creating personal details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="profileImage" className="text-gray-900 text-[16px]">
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
                  if (value[0] instanceof File) {
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
            <Label htmlFor="middleName" className="text-gray-900 text-[16px]">
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
            <Label htmlFor="phoneNumber" className="text-gray-900 text-[16px]">
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
              {...register("location", { required: true })}
              className="focus-visible:ring-0 !py-5"
            />
            {errors.location && (
              <span className="text-red-500 text-sm">Location is required</span>
            )}
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

        <div className="w-full flex flex-row items-center gap-5 justify-end">
          <Button
            variant="outline"
            type="reset"
            onClick={() => {
              reset();
              setPreviewImage(null);
            }}
            disabled={isSubmitting || createEmployerDetailsMutation.isLoading}
            className="bg-red-500/90 text-white hover:bg-red-500 hover:text-white font-semibold"
          >
            Reset
          </Button>
          <Button
            variant="default"
            type="submit"
            className="font-semibold"
            disabled={isSubmitting || createEmployerDetailsMutation.isLoading}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" />
                Saving...
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
