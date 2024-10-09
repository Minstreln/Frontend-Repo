import MobileMenu from "./MobileMenu";
import { Button } from "../ui/button";
import { navItems } from "../../lib/navItems";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userImage from "../../assets/user.png";
import { userRole } from "../../lib/constants";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="w-full bg-white border-b border-gray-200 space-y-5 flex-1">
      <div className="w-full wrapper flex items-center justify-between gap-5 py-4">
        <div className="flex items-center lg:space-x-4 w-full">
          {/** Mobile */}
          <MobileMenu />
          <Link to={"/"}>
            <h1 className="text-lg font-semibold bg-gradient-to-r to-primary from-gray-900 bg-clip-text text-transparent">
              LysterPro
            </h1>
          </Link>
          {/** Desktop */}
          <nav>
            <ul className="space-x-4 hidden md:flex">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/** Auth section */}
        <div className="w-full flex items-center justify-end space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden  sm:flex flex-col justify-center">
                <span className="text-gray-900 text-nowrap">
                  Welcome {user?.firstName}
                </span>
                <span className="text-sm leading-3 text-gray-600">
                  {user?.email}
                </span>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="w-12 h-12 cursor-pointer">
                    <AvatarImage
                      src={user?.image || userImage}
                      alt="user image"
                    />
                    <AvatarFallback>
                      {user?.firstName[0].toUpperCase()}
                      {user?.lastName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 flex flex-col gap-5">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-sm leading-5 text-gray-600">
                      {user?.email}
                    </p>
                  </div>
                  <hr />
                  <Link
                    to={`${
                      user?.role === userRole.jobSeeker
                        ? "/dashboard/candidate-profile"
                        : "/dashboard/employer-profile"
                    }`}
                  >
                    <Button
                      variant="secondary"
                      className="w-full border-none outline-none"
                    >
                      View Profile
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    className="w-full bg-red-600/90 hover:bg-red-600 text-white hover:text-white font-semibold border-none"
                    onClick={logout}
                  >
                    Log Out
                  </Button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link to="/signIn">
                <Button
                  variant="outline"
                  className="text-sm text-primary hover:text-primary font-semibold"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signUp">
                <Button variant="default" className="text-sm font-semibold">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
