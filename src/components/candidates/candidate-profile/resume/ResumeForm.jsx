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
import toast from "react-hot-toast";
import axios from "axios";
import { cloudinaryConfig } from "../../../../config/config";
import { useCreateResume } from "../../../../hooks/useCandidateResume";
import DialogFormButtons from "../../../DialogFormButtons";

const ResumeForm = () => {
  const [open, setOpen] = useState(false);

  const createResumeMutation = useCreateResume();

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
      if (data.resume[0].length === 0) return;

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", data.resume[0]);
      cloudinaryFormData.append("upload_preset", cloudinaryConfig.uploadPreset);
      cloudinaryFormData.append("api_key", cloudinaryConfig.apiKey);

      const results = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/raw/upload`,
        cloudinaryFormData
      );

      if (!results.data.secure_url) {
        throw new Error("Failed to upload resume");
      }

      const formData = {
        title: data.title,
        resume: results.data.secure_url,
      };

      await createResumeMutation.mutateAsync(formData);

      if (createResumeMutation.isSuccess) {
        toast.success("Resume added successfully");
        reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.message || "Error adding resume");
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
            size="sm"
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
            </div>
            <DialogFormButtons
              isSubmitting={isSubmitting || createResumeMutation.isLoading}
              reset={reset}
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResumeForm;
