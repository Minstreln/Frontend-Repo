/* eslint-disable react/prop-types */

import { useState } from "react";
import { useUpdateCompanyDetails } from "../../../../hooks/useEmployerCompanyDetails";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Edit } from "lucide-react";
import { Label } from "../../../ui/label";
import DialogFormButtons from "../../../DialogFormButtons";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { cloudinaryConfig } from "../../../../config/config";
import axios from "axios";
import placeholder from "@/assets/placeholder.jpg";

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
import { Textarea } from "../../../ui/textarea";
import { Input } from "../../../ui/input";

const EditCompanyDetails = ({ companyDetails }) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(companyDetails.companyLogo);

  const updateCompanyDetailsMutation = useUpdateCompanyDetails();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      companyLogo: companyDetails.companyLogo,
      employmentProof: companyDetails.employmentProof,
      companyName: companyDetails.companyName,
      companyType: companyDetails.companyType,
      yearOfJoining: companyDetails.yearOfJoining,
      aboutUs: companyDetails.aboutUs,
      location: companyDetails.location,
      companyWebsite: companyDetails.companyWebsite,
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
    setPreviewImage(companyDetails.companyLogo);
  };

  const onSubmit = async (data) => {
    try {
      let companyLogoUrl = companyDetails.companyLogo;
      let employmentProofUrl = companyDetails.employmentProof;

      if (data.companyLogo && data.companyLogo[0] instanceof File) {
        // Upload new company logo
        const companyLogoData = new FormData();
        companyLogoData.append("file", data.companyLogo[0]);
        companyLogoData.append("upload_preset", cloudinaryConfig.uploadPreset);
        companyLogoData.append("api_key", cloudinaryConfig.apiKey);

        const companyLogoResults = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
          companyLogoData
        );

        if (!companyLogoResults.data.secure_url) {
          throw new Error("Failed to Company Logo");
        }
        companyLogoUrl = companyLogoResults.data.secure_url;
        setPreviewImage(companyLogoResults.data.secure_url);
      }

      // Upload new employment proof
      if (data.employmentProof && data.employmentProof[0] instanceof File) {
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
        employmentProofUrl = employmentProofResults.data.secure_url;
      }

      // submit form data
      const formData = {
        ...data,
        companyLogo: companyLogoUrl,
        employmentProof: employmentProofUrl,
      };

      await updateCompanyDetailsMutation.mutateAsync({
        companyDetailsId: companyDetails._id,
        companyData: formData,
      });

      toast.success("Company details updated successfully");
      resetForm();
      setOpen(false);
    } catch (error) {
      toast.error(error.message || "Error updating Company details");
      console.error("Error updating Company details:", error);
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
                htmlFor="companyLogo"
                className="text-gray-900 text-[16px]"
              >
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
                <Controller
                  name="companyLogo"
                  control={control}
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
            </div>

            <div className="w-full flex flex-col md:flex-row gap-5">
              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="companyName"
                  className="text-gray-900 text-[16px]"
                >
                  Company Name
                </Label>
                <Input
                  type="text"
                  id="companyName"
                  defaultValue={companyDetails.companyName}
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
                <Label
                  htmlFor="companyType"
                  className="text-gray-900 text-[16px]"
                >
                  Company Type
                </Label>
                <Input
                  type="text"
                  id="companyType"
                  defaultValue={companyDetails.companyType}
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
                  defaultValue={companyDetails.location}
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
                <Label
                  htmlFor="companyWebsite"
                  className="text-gray-900 text-[16px]"
                >
                  Company Website
                </Label>
                <Input
                  type="text"
                  id="companyWebsite"
                  defaultValue={companyDetails.companyWebsite}
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
                <Controller
                  name="employmentProof"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                      className="focus-visible:ring-0 h-10"
                    />
                  )}
                />
                {errors.employmentProof && (
                  <span className="text-red-500 text-sm">
                    {errors.employmentProof.message}
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
                        <SelectValue
                          placeholder="Select year of Joining"
                          defaultValue={companyDetails.yearOfJoining}
                        />
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
                defaultValue={companyDetails.aboutUs}
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
          </div>
          <DialogFormButtons isSubmitting={isSubmitting} reset={resetForm} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCompanyDetails;
