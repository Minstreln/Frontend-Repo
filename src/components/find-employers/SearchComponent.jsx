import { MapPin, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import location from "@/assets/location.png";

const SearchComponet = () => {
  return (
    <div className="flex items-center space-x-4 py-2 border border-gray-200 rounded-md px-4">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Search for Job Title, Position, Keyword..."
          className="pl-10 pr-4 py-2 w-full text-gray-600 focus-visible:ring-0 border-0"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
          size={20}
        />
      </div>
      <div className="w-[1px] h-8 bg-gray-200" />
      <div className="relative flex-grow hidden sm:block">
        <Input
          type="text"
          placeholder="City, state or zip code"
          className="pl-10 pr-4 py-2 w-full text-gray-600 focus-visible:ring-0 border-0"
        />
        <MapPin
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
          size={20}
        />
        <img
          className="h-[18px] w-[18px] absolute right-2 top-1/2 transform -translate-y-1/2"
          alt=""
          src={location}
        />
      </div>

      <Button>Find Job</Button>
    </div>
  );
};

export default SearchComponet;
