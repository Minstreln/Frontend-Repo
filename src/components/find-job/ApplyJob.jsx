/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { ArrowRight } from "lucide-react";

const ApplyJob = ({ job, size = "lg" }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-white bg-primary font-semibold"
          variant="contained"
          size={size}
        >
          Apply Now <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-800">
            Apply Job: {job.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-5">
          <div className="flex flex-col gap-4">
            <Label htmlFor="resume">Choose Resume</Label>
            <Select id="resume">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select resume" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="first">First</SelectItem>
                  <SelectItem value="second">Second</SelectItem>
                  <SelectItem value="third">Third</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              placeholder="Write down your biograghy here. Let the employers know who you are..."
              id="coverLetter"
              rows={8}
            />
          </div>
        </div>
        <DialogFooter className="!w-full !flex !flex-row !items-center !justify-between">
          <Button
            type="reset"
            className="text-primary bg-primary/10 hover:text-primary hover:bg-primary/15 font-medium"
          >
            Cancel
          </Button>
          <Button variant="default" size="lg" className="font-semibold">
            Apply Now <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJob;
