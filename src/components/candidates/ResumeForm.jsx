import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const ResumeForm = () => {
  const [open, setOpen] = useState(false);

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
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("resume", data.resume[0]);

      const response = await axios.post(
        "https://lysterpro-backend.onrender.com/api/v1/jobseeker/resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Work experience added successfully");
        reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error adding work experience:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
                    placeholder="Name of Institution"
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
                    accept=".doc,.docx,.pdf,.txt,.odt"
                    {...register("resume", { required: true })}
                    className="focus-visible:ring-0"
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
                      "Save Changes"
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
