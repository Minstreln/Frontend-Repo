import { useForm } from "react-hook-form";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import { Textarea } from "../../../ui/textarea";
import userImage from "@/assets/user.png";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { cloudinaryConfig } from "../../../../config/cloudinary";

const PersonalDetailsForm = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      middleName: "",
      profileImage: "",
      location: "",
      aboutMe: "",
      linkedin: "",
      github: "",
      portfolioSite: "",
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
      let uploadedUrl;
      // Upload image to Cloudinary
      if (data.profileImage) {
        const cloudinaryFormData = new FormData();

        cloudinaryFormData.append("file", data.profileImage);
        cloudinaryFormData.append(
          "upload_preset",
          cloudinaryConfig.uploadPreset
        );
        cloudinaryFormData.append("api_key", cloudinaryConfig.apiKey);

        const results = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
          cloudinaryFormData
        );

        if (results.data.secure_url === null) {
          throw new Error("Failed to upload image");
        }

        uploadedUrl = results.data.secure_url;
        setPreviewImage(uploadedUrl);
      }

      // submit form data

      if (uploadedUrl !== null) {
        formData = { ...data, profileImage: uploadedUrl };
      }

      const response = await axios.post(
        "https://lysterpro-backend.onrender.com/api/v1/jobseeker/personal-detail",
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Profile added successfully");
        reset();
        setPreviewImage(null);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error adding profile:", error);
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
            {...register("middleName")}
            className="focus-visible:ring-0 !py-5"
          />
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
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="aboutMe" className="text-gray-900 text-[16px]">
            About Me
          </Label>
          <Textarea
            placeholder="Type something about you here..."
            id="aboutMe"
            {...register("aboutMe", {
              required: true,
              minLength: {
                value: 300,
                message: "About Me should be at least 300 characters",
              },
            })}
            className="focus-visible:ring-0 !py-5"
            rows={8}
          />
          {errors.aboutMe && (
            <span className="text-red-500 text-sm">About Me is required</span>
          )}
        </div>

        <div className="w-full flex flex-row items-center gap-2 justify-between">
          <Button
            variant="outline"
            type="reset"
            size="lg"
            onClick={() => {
              reset();
              setPreviewImage(null);
            }}
            disabled={isSubmitting}
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
              "Save"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
