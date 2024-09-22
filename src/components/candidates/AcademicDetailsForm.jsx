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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const years = Array.from({ length: 41 }, (v, i) => (1990 + i).toString());

const AcademicDetailsForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      institutionName: "",
      location: "",
      yearOfCompletion: "",
      course: "",
      certificate: "",
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
              Add New Academic Details
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
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
                    {...register("course", { required: true })}
                    className="focus-visible:ring-0 !py-5"
                  />
                  {errors.course && (
                    <span className="text-red-500 text-sm">
                      Course is required
                    </span>
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

                <div className="w-full flex flex-col gap-2 pb-4">
                  <Label
                    htmlFor="certificate"
                    className="text-gray-900 text-[16px]"
                  >
                    Upload Certificate
                  </Label>
                  <Input
                    type="file"
                    id="certificate"
                    {...register("certificate", { required: true })}
                    className="focus-visible:ring-0"
                  />
                  {errors.certificate && (
                    <span className="text-red-500 text-sm">
                      Certificate is required
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
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AcademicDetailsForm;
