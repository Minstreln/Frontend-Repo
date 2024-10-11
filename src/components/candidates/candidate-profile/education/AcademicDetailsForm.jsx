import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { cloudinaryConfig } from "../../../../config/config";
import { useCreateAcademicDetail } from "../../../../hooks/useCandidateAcademicDetails";
import DialogFormButtons from "../../../DialogFormButtons";

const years = Array.from({ length: 41 }, (v, i) => (1990 + i).toString());

const AcademicDetailsForm = () => {
  const [open, setOpen] = useState(false);

  const createAcademicDetailMutation = useCreateAcademicDetail();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      institutionName: "",
      location: "",
      yearOfCompletion: "",
      course: "",
      certificate: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Upload certificate to Cloudinary
      if (data.certificate[0].length === 0) return;

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", data.certificate[0]);
      cloudinaryFormData.append("upload_preset", cloudinaryConfig.uploadPreset);
      cloudinaryFormData.append("api_key", cloudinaryConfig.apiKey);

      const results = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/raw/upload`,
        cloudinaryFormData
      );

      if (!results.data.secure_url) {
        throw new Error("Failed to upload certificate");
      }

      const formData = { ...data, certificate: results.data.secure_url };

      await createAcademicDetailMutation.mutateAsync(formData);

      toast.success("Academic details added successfully");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
      console.error("Error adding academic details:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="text-white bg-primary font-semibold"
            variant="contained"
            size="sm"
          >
            Add New
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg text-gray-800">
              Add New Academic Details
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 pr-3 overflow-y-scroll max-h-[400px]">
              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="institutionName"
                  className="text-gray-900 text-[16px]"
                >
                  Name of Institution
                </Label>
                <Input
                  type="text"
                  id="institutionName"
                  placeholder="Name of Institution"
                  {...register("institutionName", { required: true })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.institutionName && (
                  <span className="text-red-500 text-sm">
                    Name of Institution is required
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="course" className="text-gray-900 text-[16px]">
                  Course
                </Label>
                <Input
                  type="text"
                  id="course"
                  placeholder="Course"
                  {...register("course", { required: true })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.course && (
                  <span className="text-red-500 text-sm">
                    Course is required
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="yearOfCompletion"
                  className="text-gray-900 text-[16px]"
                >
                  Year of Completion
                </Label>
                <Controller
                  name="yearOfCompletion"
                  control={control}
                  rules={{ required: "Year of Completion is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="py-5">
                        <SelectValue placeholder="Select year of completion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select year of completion</SelectLabel>
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
                {errors.yearOfCompletion && (
                  <span className="text-red-500 text-sm">
                    Year Of Completion is required
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
                  placeholder="City, Country"
                  {...register("location", { required: true })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.location && (
                  <span className="text-red-500 text-sm">
                    Location is required
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col gap-2 pb-4">
                <Label
                  htmlFor="certificate"
                  className="text-gray-900 text-[16px]"
                >
                  Upload Certificate
                </Label>
                <Input
                  type="file"
                  id="certificate"
                  accept="application/pdf"
                  {...register("certificate", { required: true })}
                  className="focus-visible:ring-0 h-10"
                />
                {errors.certificate && (
                  <span className="text-red-500 text-sm">
                    Certificate is required
                  </span>
                )}
              </div>
            </div>
            <DialogFormButtons
              isSubmitting={
                isSubmitting || createAcademicDetailMutation.isLoading
              }
              reset={reset}
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AcademicDetailsForm;
