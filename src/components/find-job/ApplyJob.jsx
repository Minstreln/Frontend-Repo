/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import DialogFormButtons from "../DialogFormButtons";
import { useApplyForJob } from "../../hooks/useJobs";

const ApplyJob = ({ job, size = "lg" }) => {
  const [open, setOpen] = useState(false);
  const { auth, user } = useAuth();
  const { data } = useFetchResume();

  const applyForJobMutation = useApplyForJob();

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

  const onSubmit = async (data) => {
    try {
      if (!auth) {
        toast.error("Please signin to apply");
        return;
      }
      const formData = { ...data, jobListing: job._id };

      await applyForJobMutation.mutateAsync(formData);

      if (applyForJobMutation.isSuccess) {
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
            Apply For Job: {job.position}
          </DialogTitle>
        </DialogHeader>
        {data && data.results === 0 ? (
          <div>
            <DialogDescription className="text-gray-600 text-[16px] py-6 flex flex-col gap-1">
              <span className="text-destructive font-semibold">
                No resume found!...
              </span>{" "}
              <span>Please upload your resume to apply</span>
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="outline"
                type="reset"
                onClick={() => setOpen(false)}
                className="bg-red-500/90 text-white hover:bg-red-500 hover:text-white font-semibold"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
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
                  <span className="text-red-500 text-sm">
                    Resume is required
                  </span>
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

            <DialogFormButtons isSubmitting={isSubmitting} reset={reset} />
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJob;
