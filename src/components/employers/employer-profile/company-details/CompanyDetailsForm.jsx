import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { useState } from "react";
import { Button } from "../../../ui/button";
import placeholder from "@/assets/placeholder.jpg";
import { Textarea } from "../../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { years } from "../../../../lib/constants";
import { cloudinaryConfig } from "../../../../config/config";
import axios from "axios";
import toast from "react-hot-toast";
import { useCreateCompanyDetails } from "../../../../hooks/useEmployerCompanyDetails";

const CompanyDetailsForm = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const createCompanyDetailsMutation = useCreateCompanyDetails();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      companyName: "",
      companyLogo: "",
      companyType: "",
      employmentProof: "",
      yearOfJoining: "",
      aboutUs: "",
      location: "",
      companyWebsite: "",
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
      if (!data.companyLogo || !data.employmentProof) return;

      // Upload company logo to Cloudinary
      const companyLogoData = new FormData();
      companyLogoData.append("file", data.companyLogo[0]);
      companyLogoData.append("upload_preset", cloudinaryConfig.uploadPreset);
      companyLogoData.append("api_key", cloudinaryConfig.apiKey);

      const companyLogoResults = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        companyLogoData
      );

      if (!companyLogoResults.data.secure_url) {
        throw new Error("Failed to upload Company Logo");
      }
      setPreviewImage(companyLogoResults.data.secure_url);

      // Upload employmentProof to Cloudinary
      const employmentProofData = new FormData();
      employmentProofData.append("file", data.employmentProof[0]);
      employmentProofData.append(
        "upload_preset",
        cloudinaryConfig.uploadPreset
      );
      employmentProofData.append("api_key", cloudinaryConfig.apiKey);

      const employmentProofResults = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/raw/upload`,
        employmentProofData
      );

      if (!employmentProofResults.data.secure_url) {
        throw new Error("Failed to employment proof");
      }

      // submit form data
      const formData = {
        ...data,
        companyLogo: companyLogoResults.data.secure_url,
        employmentProof: employmentProofResults.data.secure_url,
      };

      await createCompanyDetailsMutation.mutateAsync(formData);

      toast.success("Company details added successfully");
      reset();
      setPreviewImage(null);
    } catch (error) {
      toast.error(error);
      console.error("Error adding Company details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="companyLogo" className="text-gray-900 text-[16px]">
            Company Logo
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
                src={placeholder}
                alt="profile image"
                className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-md"
              />
            )}
            <Input
              type="file"
              id="companyLogo"
              accept="image/*"
              {...register("companyLogo", { required: true })}
              onChange={handleFileChange}
              className="focus-visible:ring-0 h-10 max-w-sm"
            />
          </div>
          {errors.companyLogo && (
            <span className="text-red-500 text-sm">
              Company Logo is required
            </span>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="companyName" className="text-gray-900 text-[16px]">
              Company Name
            </Label>
            <Input
              type="text"
              id="companyName"
              placeholder="Company Name"
              {...register("companyName", { required: true })}
              className="focus-visible:ring-0 !py-5"
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">
                Company Name is required
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="companyType" className="text-gray-900 text-[16px]">
              Company Type
            </Label>
            <Input
              type="text"
              id="companyType"
              placeholder="Company Type"
              {...register("companyType", { required: true })}
              className="focus-visible:ring-0 !py-5"
            />
            {errors.companyType && (
              <span className="text-red-500 text-sm">
                Company Type is required
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="location" className="text-gray-900 text-[16px]">
              Location
            </Label>
            <Input
              type="text"
              id="location"
              placeholder="Location"
              {...register("location", { required: true })}
              className="focus-visible:ring-0 !py-5"
            />
            {errors.location && (
              <span className="text-red-500 text-sm">Location is required</span>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label
              htmlFor="companyWebsite"
              className="text-gray-900 text-[16px]"
            >
              Company Website
            </Label>
            <Input
              type="text"
              id="companyWebsite"
              placeholder="Company Website"
              {...register("companyWebsite")}
              className="focus-visible:ring-0 !py-5"
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-full flex flex-col gap-2">
            <Label
              htmlFor="employmentProof"
              className="text-gray-900 text-[16px]"
            >
              Employment Proof
            </Label>
            <Input
              type="file"
              id="employmentProof"
              accept="application/pdf"
              {...register("employmentProof", { required: true })}
              className="focus-visible:ring-0 h-10"
            />
            {errors.employmentProof && (
              <span className="text-red-500 text-sm">
                Employment Proof is required
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label
              htmlFor="yearOfJoining"
              className="text-gray-900 text-[16px]"
            >
              Year Of Joining
            </Label>
            <Controller
              name="yearOfJoining"
              control={control}
              rules={{ required: "Year of Joining is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="Select year of Joining" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select year of Joining</SelectLabel>
                      {years.map((year) => (
                        <SelectItem
                          key={year}
                          value={year}
                          className="cursor-pointer"
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.yearOfJoining && (
              <span className="text-red-500 text-sm">
                {errors.yearOfJoining?.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="aboutUs" className="text-gray-900 text-[16px]">
            About Company
          </Label>
          <Textarea
            placeholder="Type something about the company here..."
            id="aboutUs"
            {...register("aboutUs", {
              required: "About Company is required",
              minLength: {
                value: 150,
                message: "About Company should be at least 150 characters",
              },
            })}
            className="focus-visible:ring-0 !py-5"
            rows={8}
          />
          {errors.aboutUs && (
            <span className="text-red-500 text-sm">
              {errors.aboutUs?.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-row items-center gap-5 justify-end">
          <Button
            variant="outline"
            type="reset"
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

export default CompanyDetailsForm;
