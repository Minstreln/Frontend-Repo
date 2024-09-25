import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import SidebarNav from "./SidebarNav";
import useAuth from "../hooks/useAuth";
import useCurrentPage from "../hooks/useCurrentPage";
import {
  candidatesSidebarNavItems,
  employersSidebarNavItems,
} from "../lib/navItems";
import { userRole } from "../lib/constants";

const MobileSidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { currentPage } = useCurrentPage();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-8 w-8 text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] bg-primary-foreground text-gray-600"
      >
        {user.role === userRole.jobSeeker ? (
          <SidebarNav
            title={"Candidate Dashboard"}
            activeItem={currentPage}
            navItems={candidatesSidebarNavItems}
            setIsOpen={setIsOpen}
          />
        ) : (
          <SidebarNav
            title={"Employers Dashboard"}
            activeItem={currentPage}
            navItems={employersSidebarNavItems}
            setIsOpen={setIsOpen}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebarNav;
