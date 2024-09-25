/* eslint-disable react/prop-types */

import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import userImage from "@/assets/user.png";
import { Textarea } from "../ui/textarea";

const EditPersonalDetails = ({ personalDetails }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [open, setOpen] = useState(false);

  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      middleName: personalDetails?.middleName || "",
      profileImage: personalDetails?.profileImage,
      location: personalDetails?.location,
      aboutMe: personalDetails?.aboutMe,
      linkedAccount: personalDetails?.linkedAccount,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof File) {
      setPreviewImage(file);
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", data.profileImage[0]);
      formData.append("middleName", data.middleName);
      formData.append("location", data.location);
      formData.append("aboutMe", data.aboutMe);
      formData.append("linkedAccount", data.linkedAccount);

      const response = await axios.patch(
        `https://lysterpro-backend.onrender.com/api/v1/jobseeker/update-personal-detail/${personalDetails._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Profile updated successfully");
        reset();
        setPreviewImage(null);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating profile:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-white bg-primary mt-6 text-lg"
          variant="contained"
          size={"lg"}
        >
          <Edit className="h-5 w-5 mr-2" /> Edit Personal Details
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-800">
            Edit Personal Details
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 overflow-y-scroll max-h-[400px] pr-2">
            <div className="w-full flex flex-row gap-5 items-end justify-start">
              <img
                src={previewImage ? previewImage : userImage}
                alt="profile image"
                className="w-40 h-40 object-cover"
              />
              <div className="w-full max-w-sm flex flex-col gap-2 pb-4">
                <Label
                  htmlFor="profileImage"
                  className="text-gray-900 text-[16px]"
                >
                  Profile Image
                </Label>
                <Input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  {...register("profileImage")}
                  className="focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="middleName" className="text-gray-900 text-[16px]">
                Middle Name
              </Label>
              <Input
                type="text"
                id="middleName"
                placeholder="Middle Name"
                defaultValue={personalDetails?.middleName || ""}
                {...register("middleName", { required: true })}
                className="focus-visible:ring-0 !py-5"
              />
              {errors.middleName && (
                <span className="text-red-500 text-sm">
                  Middle Name is required
                </span>
              )}
            </div>

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
                defaultValue={personalDetails?.linkedAccount || ""}
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
                defaultValue={personalDetails?.location || ""}
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
              <Label htmlFor="aboutMe" className="text-gray-900 text-[16px]">
                About Me
              </Label>
              <Textarea
                placeholder="Type something about you here..."
                id="aboutMe"
                defaultValue={personalDetails?.aboutMe || ""}
                {...register("aboutMe", { required: true })}
                className="focus-visible:ring-0 !py-5"
                rows={8}
              />
              {errors.aboutMe && (
                <span className="text-red-500 text-sm">
                  About Me is required
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="!w-full !flex !flex-row !items-center !justify-between pt-5">
            <Button
              variant="outline"
              type="reset"
              size="lg"
              onClick={() => {
                reset();
                setPreviewImage(null);
              }}
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
                "Edit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPersonalDetails;
