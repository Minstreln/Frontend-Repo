import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../ui/button";
import { EllipsisVertical, Eye, Pencil } from "lucide-react";

const JobActions = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-primary"
        >
          <EllipsisVertical className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] flex flex-col gap-5 px-0">
        <div>
          <div className="w-full flex flex-row items-center justify-start gap-2 text-sm font-medium text-gray-600 px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all hover:cursor-pointer">
            <Pencil className="h-4 w-4" /> <span>Edit</span>
          </div>
          <div className="w-full flex flex-row items-center justify-start gap-2 text-sm font-medium text-gray-600 px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all hover:cursor-pointer">
            <Eye className="h-4 w-4" /> <span>View details</span>
          </div>
          <div className="w-full flex flex-row items-center justify-start gap-2 text-sm font-medium text-gray-600 px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all hover:cursor-pointer">
            <Pencil className="h-4 w-4" /> <span>Mark it Expired</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JobActions;
