/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Controller, useForm, useWatch } from "react-hook-form";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { jobLocationTypes, typeOfRole } from "../../../../lib/constants";
import { Pencil } from "lucide-react";
import { Checkbox } from "../../../ui/checkbox";
import { useUpdateWorkExperience } from "../../../../hooks/useCandidateWorkExperience";
import DialogFormButtons from "../../../DialogFormButtons";

const EditWorkExperienceDetails = ({ detail }) => {
  const [open, setOpen] = useState(false);

  const updateWorkExperienceMutation = useUpdateWorkExperience();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: detail.role,
      typeOfRole: detail.typeOfRole,
      company: detail.company,
      typeOfOrg: detail.typeOfOrg,
      location: detail.location,
      startDate: detail.startDate,
      endDate: detail.endDate,
      currentWorkPlace: detail.currentWorkPlace,
    },
  });

  // Watch the currentWorkPlace checkbox
  const currentWorkPlace = useWatch({
    control,
    name: "currentWorkPlace",
  });

  useEffect(() => {
    if (currentWorkPlace) {
      setValue("endDate", null);
    } else if (!watch("endDate")) {
      setValue("endDate", new Date());
    }
  }, [currentWorkPlace, setValue, watch]);

  const onSubmit = async (data) => {
    try {
      await updateWorkExperienceMutation.mutateAsync({
        workExperienceId: detail._id,
        workExperienceData: data,
      });

      toast.success("Work Experience updated successfully");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating work experience:", error);
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
            Edit Work Experince
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 overflow-y-scroll max-h-[400px]">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="company" className="text-gray-900 text-[16px]">
                  Company
                </Label>
                <Input
                  type="text"
                  id="company"
                  placeholder="Company"
                  defaultValue={detail.company}
                  {...register("company", { required: true })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.company && (
                  <span className="text-red-500 text-sm">
                    Company is required
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="role" className="text-gray-900 text-[16px]">
                  Role
                </Label>
                <Input
                  type="text"
                  id="role"
                  placeholder="Role"
                  defaultValue={detail.role}
                  {...register("role", { required: true })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.role && (
                  <span className="text-red-500 text-sm">Role is required</span>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="typeOfRole"
                  className="text-gray-900 text-[16px]"
                >
                  Type Of Role
                </Label>
                <Controller
                  name="typeOfRole"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={detail.typeOfRole}
                    >
                      <SelectTrigger className="py-5">
                        <SelectValue placeholder="Select year of completion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select type of role</SelectLabel>
                          {typeOfRole.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value}
                              className="cursor-pointer"
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.typeOfRole && (
                  <span className="text-red-500 text-sm">
                    Type Of Role is required
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="location" className="text-gray-900 text-[16px]">
                  Job Location
                </Label>
                <Controller
                  name="location"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={detail.location}
                    >
                      <SelectTrigger className="py-5">
                        <SelectValue placeholder="Select job location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select job location</SelectLabel>
                          {jobLocationTypes.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value}
                              className="cursor-pointer"
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.location && (
                  <span className="text-red-500 text-sm">
                    Job Location is required
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="typeOfOrg"
                  className="text-gray-900 text-[16px]"
                >
                  Type Of Organisation
                </Label>
                <Input
                  type="text"
                  id="typeOfOrg"
                  placeholder="Type Of Organisation"
                  defaultValue={detail.typeOfOrg}
                  {...register("typeOfOrg", { required: true })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.typeOfOrg && (
                  <span className="text-red-500 text-sm">
                    Type Of Organisation is required
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="startDate"
                  className="text-gray-900 text-[16px]"
                >
                  Start Date
                </Label>
                <Input
                  type="date"
                  id="startDate"
                  defaultValue={detail.startDate}
                  {...register("startDate")}
                  className="focus-visible:ring-0 h-10"
                />
                {errors.startDate && (
                  <span className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="endDate" className="text-gray-900 text-[16px]">
                  End Date
                </Label>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required:
                      !currentWorkPlace && "Please enter a valid end date",
                    validate: (value) => {
                      if (currentWorkPlace) return true;
                      return (
                        new Date(value) > new Date(watch("startDate")) ||
                        "End date must be after start date"
                      );
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      type="date"
                      id="endDate"
                      {...field}
                      value={field.value || ""}
                      defaultValue={detail.endDate}
                      className={`focus-visible:ring-0 h-10 ${
                        currentWorkPlace ? "bg-gray-100" : ""
                      }`}
                      disabled={currentWorkPlace}
                    />
                  )}
                />
                {errors.endDate && (
                  <span className="text-red-500 text-sm">
                    {errors.endDate.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-row gap-2 items-center">
                <Controller
                  name="currentWorkPlace"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="currentWorkPlace"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label
                  htmlFor="currentWorkPlace"
                  className="text-gray-900 text-[16px]"
                >
                  Current Work Place
                </Label>
              </div>
            </div>
            <DialogFormButtons
              isSubmitting={
                isSubmitting || updateWorkExperienceMutation.isLoading
              }
              reset={reset}
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditWorkExperienceDetails;
