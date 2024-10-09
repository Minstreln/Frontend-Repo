/* eslint-disable react/prop-types */
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { jobLocationTypes, typeOfRole } from "../../../../lib/constants";
import { Pencil } from "lucide-react";

const EditWorkExperienceDetails = ({ refetch, detail }) => {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: detail.role,
      typeOfRole: detail.typeOfRole,
      company: detail.company,
      typeOfOrg: detail.typeOfOrg,
      location: detail.location,
      duration: detail.duration,
      currentWorkPlace: detail.currentWorkPlace,
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("FormData: ", data);

      // get only the fields that have been edited/changed
      const changedData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== detail[key]) {
          acc[key] = data[key];
        }
        return acc;
      }, {});

      console.log(changedData);
      if (Object.keys(changedData).length === 0) {
        return;
      }

      const response = await axios.patch(
        `https://lysterpro-backend.onrender.com/api/v1/jobseeker/update-experience-detail/${detail._id}`,
        changedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Work experience updated successfully");
        setOpen(false);
        refetch();
      }
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
                <Label htmlFor="duration" className="text-gray-900 text-[16px]">
                  Duration (in years)
                </Label>
                <Input
                  type="number"
                  id="duration"
                  placeholder="Duration"
                  defaultValue={detail.duration}
                  {...register("duration", {
                    required: "Duration is required",
                    min: {
                      value: 0,
                      message: "Duration must be a positive number",
                    },
                    valueAsNumber: true,
                  })}
                  className="focus-visible:ring-0 !py-5"
                />
                {errors.duration && (
                  <span className="text-red-500 text-sm">
                    {errors.duration.message}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter>
              <div className="w-full flex flex-row items-center gap-2 justify-between pt-8">
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
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditWorkExperienceDetails;
