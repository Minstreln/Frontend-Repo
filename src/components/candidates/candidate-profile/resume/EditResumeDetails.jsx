/* eslint-disable react/prop-types */
import { Pencil } from "lucide-react";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import toast from "react-hot-toast";
import DialogFormButtons from "../../../DialogFormButtons";
import { useUpdateResume } from "../../../../hooks/useCandidateResume";

const EditResumeDetails = ({ detail }) => {
  const [open, setOpen] = useState(false);

  const updateResumeMutation = useUpdateResume();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: detail.title,
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateResumeMutation.mutateAsync({
        resumeId: detail._id,
        resumeData: data,
      });

      toast.success("Resume edited successfully");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(error.message || "Error editing resume");
      console.error("Error editing resume:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-5 w-5 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-800">
            Edit Resume Detail
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
                defaultValue={detail.title}
                {...register("title", { required: true })}
                className="focus-visible:ring-0 !py-5"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">Title is required</span>
              )}
            </div>
          </div>
          <DialogFormButtons
            isSubmitting={isSubmitting || updateResumeMutation.isLoading}
            reset={reset}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditResumeDetails;
