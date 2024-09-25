import { useState } from "react";
import { navItems } from "../../lib/navItems";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-gray-600" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-primary-foreground text-gray-600"
      >
        <nav className="flex flex-col space-y-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item.path}
              className="text-lg hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Button
            variant="outline"
            className="text-sm bg-red-600/90 hover:bg-red-600 text-white hover:text-white font-semibold"
            onClick={logout}
          >
            Log Out
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
