import { MapPin, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FindJob = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-grow">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="text"
          placeholder="Job title, keyword, company"
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
      <div className="relative w-64">
        <MapPin
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="text"
          placeholder="Your location"
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
      <Button variant="default" className="px-6">
        Find Job
      </Button>
    </div>
  );
};

export default FindJob;
