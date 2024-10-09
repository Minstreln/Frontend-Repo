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
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import toast from "react-hot-toast";
import axios from "axios";

const EditResumeDetails = ({ refetch, detail }) => {
  const [open, setOpen] = useState(false);

  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: detail.title,
      resume: detail.resume,
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const response = await axios.patch(
        `https://lysterpro-backend.onrender.com/api/v1/jobseeker/update-resume/${detail._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Resume edited successfully");
        reset();
        setOpen(false);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
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
      </DialogContent>
    </Dialog>
  );
};

export default EditResumeDetails;
