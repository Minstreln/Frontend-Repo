import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { typeOfRole } from "../../lib/constants";
import { Textarea } from "../ui/textarea";

const WorkExperienceDetailsForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "",
      typeOfRole: "",
      company: "",
      typeOfOrg: "",
      location: "",
      duration: 0,
      currentWorkPlace: true,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Dialog>
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
              Add New Work Experince
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5 overflow-y-scroll max-h-[400px] scrollbar-hide">
                <div className="w-full flex flex-col gap-2">
                  <Label
                    htmlFor="company"
                    className="text-gray-900 text-[16px]"
                  >
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
                    <span className="text-red-500 text-sm">
                      Role is required
                    </span>
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
                    rules={{ required: "Type Of Role" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
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
                  <Label
                    htmlFor="location"
                    className="text-gray-900 text-[16px]"
                  >
                    Location
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    placeholder="Location"
                    {...register("location", { required: true })}
                    className="focus-visible:ring-0 !py-5"
                  />
                  {errors.location && (
                    <span className="text-red-500 text-sm">
                      Location is required
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
                    htmlFor="duration"
                    className="text-gray-900 text-[16px]"
                  >
                    Duration
                  </Label>
                  <Input
                    type="number"
                    id="duration"
                    placeholder="Duration"
                    {...register("duration", {
                      required: "Duration is required",
                      min: {
                        value: 0,
                        message: "Duration must be a positive number",
                      },
                    })}
                    className="focus-visible:ring-0 !py-5"
                  />
                  {errors.duration && (
                    <span className="text-red-500 text-sm">
                      {errors.duration.message}
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Label
                    htmlFor="description"
                    className="text-gray-900 text-[16px]"
                  >
                    Description
                  </Label>
                  <Textarea
                    placeholder="Type job description here..."
                    id="description"
                    {...register("description", { required: true })}
                    className="focus-visible:ring-0 !py-5"
                    rows={5}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm">
                      Description is required
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
                    className="bg-red-500/90 text-white hover:bg-red-500 hover:text-white font-semibold"
                  >
                    Reset
                  </Button>
                  <Button
                    variant="default"
                    type="submit"
                    size="lg"
                    className="font-semibold"
                  >
                    {isSubmitting ? (
                      <div>
                        <span className="animate-spin h-5 w-5 mr-3" />
                        Saving...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkExperienceDetailsForm;
