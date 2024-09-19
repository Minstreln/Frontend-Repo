import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import filters from "@/assets/filters.png";

const industries = [
  "Developments",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Photography & Video",
];

const jobTypes = [
  "Full Time",
  "Part Time",
  "Internship",
  "Temporary",
  "Contract Base",
];

const salaryRanges = [
  "$0 - $100",
  "$100 - $1,000",
  "$1,000 - $10,000",
  "$10,000 - $100,000",
];

const Filters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("Full Time");
  const [salaryRange, setSalaryRange] = useState([0, 100000]);

  const handleSalaryChange = (value) => {
    setSalaryRange(value);
  };

  const handleIndustryChange = (industry) => {
    setSelectedIndustries((prev) => {
      if (prev.includes(industry)) {
        return prev.filter((item) => item !== industry); // Remove if already selected
      } else {
        return [...prev, industry]; // Add if not selected
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-gray-900">
          <img
            className="h-[18px] w-[18px] relative mr-2"
            alt=""
            src={filters}
          />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[200px] sm:w-[300px] bg-primary-foreground text-gray-600 overflow-y-auto"
      >
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-gray-900 font-semibold -mt-4">
            Filters
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Industry</h3>
            {industries.map((industry) => (
              <div key={industry} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={industry}
                  checked={selectedIndustries.includes(industry)} // Check if industry is selected
                  onCheckedChange={() => handleIndustryChange(industry)} // Handle change
                />
                <Label htmlFor={industry}>{industry}</Label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Job Type</h3>
            <RadioGroup
              value={selectedJobType}
              onValueChange={setSelectedJobType}
            >
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type}>{type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Salary range ($)</h3>
            <Slider
              min={0}
              max={100000}
              step={1000}
              value={salaryRange}
              onValueChange={handleSalaryChange}
              className="mb-4"
            />
            <div className="flex justify-between text-sm">
              <span>Min: ${salaryRange[0]}</span>
              <span>Max: ${salaryRange[1]}</span>
            </div>
            {salaryRanges.map((range) => (
              <div key={range} className="flex items-center space-x-2 mb-2">
                <Checkbox id={range} />
                <Label htmlFor={range}>{range}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full font-semibold">Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Filters;
