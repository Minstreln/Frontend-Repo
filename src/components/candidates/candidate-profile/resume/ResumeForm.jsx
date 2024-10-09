/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { cloudinaryConfig } from "../../../../config/cloudinary";

const ResumeForm = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState(null);

  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      resume: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Upload image to Cloudinary
      if (data.resume[0].length === 0) return;

      const cloudinaryFormData = new FormData();

      cloudinaryFormData.append("file", data.resume[0]);
      cloudinaryFormData.append("upload_preset", cloudinaryConfig.uploadPreset);
      cloudinaryFormData.append("api_key", cloudinaryConfig.apiKey);

      const results = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/raw/upload`,
        cloudinaryFormData
      );

      if (results.data.secure_url === null) {
        throw new Error("Failed to upload image");
      }
      setUploadedResumeUrl(results.data.secure_url);

      if (uploadedResumeUrl !== null) {
        const formData = { ...data, resume: uploadedResumeUrl };

        const response = await axios.post(
          "https://lysterpro-backend.onrender.com/api/v1/jobseeker/resume",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
          }
        );

        if (response.data.status === "success") {
          toast.success("Resume added successfully");
          reset();
          setOpen(false);
          refetch();
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error adding resume:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} size="lg">
        <DialogTrigger asChild>
          <Button
            className="text-white bg-primary font-semibold"
            variant="contained"
            size="lg"
          >
            Add New
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg text-gray-800">
              Add New Resume
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <div className="w-full flex flex-col gap-2">
                  <Label htmlFor="title" className="text-gray-900 text-[16px]">
                    Title
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Resume Title"
                    {...register("title", { required: true })}
                    className="focus-visible:ring-0 !py-5"
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm">
                      Title is required
                    </span>
                  )}
                </div>

                <div className="w-full flex flex-col gap-2 pb-4">
                  <Label htmlFor="resume" className="text-gray-900 text-[16px]">
                    Upload Resume
                  </Label>
                  <Input
                    type="file"
                    id="resume"
                    accept="application/pdf"
                    {...register("resume", { required: true })}
                    className="focus-visible:ring-0 h-10"
                  />
                  {errors.resume && (
                    <span className="text-red-500 text-sm">
                      Resume is required
                    </span>
                  )}
                </div>

                <div className="w-full flex flex-row items-center gap-2 justify-between">
                  <Button
                    variant="outline"
                    type="reset"
                    size="lg"
                    onClick={() => reset()}
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResumeForm;
