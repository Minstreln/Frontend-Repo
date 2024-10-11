import { Controller, useForm, useWatch } from "react-hook-form";
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
import { Checkbox } from "../../../ui/checkbox";
import { jobLocationTypes, typeOfRole } from "../../../../lib/constants";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useCreateWorkExperience } from "../../../../hooks/useCandidateWorkExperience";
import DialogFormButtons from "../../../DialogFormButtons";

const WorkExperienceForm = () => {
  const [open, setOpen] = useState(false);

  const createWorkExperienceMutation = useCreateWorkExperience();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "",
      typeOfRole: "",
      company: "",
      typeOfOrg: "",
      location: "",
      startDate: new Date(),
      endDate: null,
      currentWorkPlace: false,
    },
  });

  // Watch the currentWorkPlace checkbox
  const currentWorkPlace = useWatch({
    control,
    name: "currentWorkPlace",
  });

  // Effect to handle endDate changes based on currentWorkPlace
  useEffect(() => {
    if (currentWorkPlace) {
      setValue("endDate", null);
    } else if (!watch("endDate")) {
      setValue("endDate", new Date());
    }
  }, [currentWorkPlace, setValue, watch]);

  const onSubmit = async (data) => {
    try {
      await createWorkExperienceMutation.mutateAsync(data);

      toast.success("Work Experience added successfully");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(error.message || "Error adding work experience");
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
            size="sm"
          >
            Add New
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg text-gray-800">
              Add New Work Experince
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 pr-3 pb-5 overflow-y-scroll max-h-[400px]">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="company" className="text-gray-900 text-[16px]">
                  Company
                </Label>
                <Input
                  type="text"
                  id="company"
                  placeholder="Company"
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                  {...register("startDate", {
                    required: "Please enter a valid start date",
                  })}
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
                isSubmitting || createWorkExperienceMutation.isLoading
              }
              reset={reset}
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default WorkExperienceForm;
