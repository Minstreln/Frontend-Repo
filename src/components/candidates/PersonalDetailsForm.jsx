import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import userImage from "@/assets/user.png";

const PersonalDetailsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      profileImage: "",
      location: "",
      aboutMe: "",
      linkedAccount: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <div className="w-full flex flex-row gap-5 items-end justify-start">
          <img src={userImage} alt="Brand Image" className="w-40 h-40" />
          <div className="w-full max-w-sm flex flex-col gap-2 pb-4">
            <Label htmlFor="profileImage" className="text-gray-900 text-[16px]">
              Profile Image
            </Label>
            <Input
              type="file"
              id="profileImage"
              {...register("profileImage", { required: true })}
              className="focus-visible:ring-0"
            />
            {errors.profileImage && (
              <span className="text-red-500 text-sm">
                Profile Image is required
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="firstName" className="text-gray-900 text-[16px]">
              First Name
            </Label>
            <Input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register("firstName", { required: true })}
              className="focus-visible:ring-0 !py-5"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                First Name is required
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="lastName" className="text-gray-900 text-[16px]">
              Last Name
            </Label>
            <Input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register("lastName", { required: true })}
              className="focus-visible:ring-0 !py-5"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                Last Name is required
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-full flex flex-col gap-2">
            <Label
              htmlFor="linkedAccount"
              className="text-gray-900 text-[16px]"
            >
              Linked Profile URL
            </Label>
            <Input
              type="text"
              id="linkedAccount"
              placeholder="Linked Profile URL"
              {...register("linkedAccount", { required: true })}
              className="focus-visible:ring-0 !py-5"
            />
            {errors.linkedAccount && (
              <span className="text-red-500 text-sm">
                Linked Profile URL is required
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
              placeholder="Location"
              {...register("location", { required: true })}
              className="focus-visible:ring-0 !py-5"
            />
            {errors.location && (
              <span className="text-red-500 text-sm">Location is required</span>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="aboutMe" className="text-gray-900 text-[16px]">
            About Me
          </Label>
          <Textarea
            placeholder="Type something about you here..."
            id="aboutMe"
            {...register("aboutMe", { required: true })}
            className="focus-visible:ring-0 !py-5"
            rows={8}
          />
          {errors.aboutMe && (
            <span className="text-red-500 text-sm">About Me is required</span>
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
  );
};

export default PersonalDetailsForm;
