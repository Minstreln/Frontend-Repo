/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { userRole } from "../../lib/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFetchResume } from "../../hooks/useCandidateResume";

const ApplyJob = ({ job, size = "lg" }) => {
  const [open, setOpen] = useState(false);
  const { auth, user } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      jobListing: job._id,
      resume: "",
      coverLetter: "",
    },
  });

  const { data } = useFetchResume();

  const onSubmit = async (data) => {
    try {
      if (!auth) {
        toast.error("Please signin to apply");
        return;
      }
      const formData = { ...data, jobListing: job._id };
      const response = await axios.post(
        "https://lysterpro-backend.onrender.com/api/v1/applications/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Application successfully");
        reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error applying to job:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {user.role === userRole.jobSeeker && (
          <Button
            className="text-white bg-primary font-semibold"
            variant="contained"
            size={size}
          >
            Apply Now <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-800">
            Apply Job: {job.position}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 py-5">
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="resume" className="text-gray-900 text-[16px]">
                Resume
              </Label>
              <Controller
                name="resume"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="py-5">
                      <SelectValue placeholder="Select resume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select resume</SelectLabel>
                        {data &&
                          data.data.userResume.map((item) => (
                            <SelectItem
                              key={item._id}
                              value={item._id}
                              className="cursor-pointer"
                            >
                              {item.title}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.resume && (
                <span className="text-red-500 text-sm">Resume is required</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label
                htmlFor="coverLetter"
                className="text-gray-900 text-[16px]"
              >
                Cover Letter
              </Label>
              <Textarea
                {...register("coverLetter", { required: true })}
                placeholder="Write down your biograghy here. Let the employers know who you are..."
                id="coverLetter"
                rows={6}
              />
              {errors.coverLetter && (
                <span className="text-red-500 text-sm">
                  Cover Letter is required
                </span>
              )}
            </div>
          </div>

          <DialogFooter>
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
                  "Save"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJob;
