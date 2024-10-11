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
import { Controller, useForm } from "react-hook-form";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import toast from "react-hot-toast";
import { useUpdateAcademicDetail } from "../../../../hooks/useCandidateAcademicDetails";
import DialogFormButtons from "../../../DialogFormButtons";

const years = Array.from({ length: 41 }, (v, i) => (1990 + i).toString());

const EditAcademicDetails = ({ detail }) => {
  const [open, setOpen] = useState(false);

  const updateAcademicDetailMutation = useUpdateAcademicDetail();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      institutionName: detail.institutionName,
      location: detail.location,
      yearOfCompletion: detail.yearOfCompletion,
      course: detail.course,
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateAcademicDetailMutation.mutateAsync({
        academicDetailId: detail._id,
        academicDetailData: data,
      });

      toast.success("Academic detail updated successfully");
      setOpen(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update academic detail"
      );

      console.error("Failed to update academic detail", err);
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
            Edit Academic Detail
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
                defaultValue={detail.institutionName}
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
                defaultValue={detail.course}
                {...register("course", { required: true })}
                className="focus-visible:ring-0 !py-5"
              />
              {errors.course && (
                <span className="text-red-500 text-sm">Course is required</span>
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={detail.yearOfCompletion}
                  >
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
                defaultValue={detail.location}
                {...register("location", { required: true })}
                className="focus-visible:ring-0 !py-5"
              />
              {errors.location && (
                <span className="text-red-500 text-sm">
                  Location is required
                </span>
              )}
            </div>
          </div>
          <DialogFormButtons
            isSubmitting={
              isSubmitting || updateAcademicDetailMutation.isLoading
            }
            reset={reset}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAcademicDetails;
