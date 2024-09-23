import { Search } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { navItems } from "../../lib/navItems";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="w-full bg-white border-b border-gray-200 space-y-5 flex-1">
      <div className="bg-[#F1F2F4] w-full py-2">
        <div className="wrapper flex items-center justify-between ">
          <nav>
            {/** Desktop */}
            <ul className="space-x-4 hidden md:flex">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {isAuthenticated && (
                <li>
                  <Link
                    to={`/dashboard`}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>

            {/** Mobile */}
            <MobileMenu />
          </nav>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">+1 302-555-0178</span>
            <span className="text-sm text-gray-600">|</span>
            <span className="text-sm text-gray-600">+231 881 845358</span>
          </div>
        </div>
      </div>
      <div className="w-full wrapper flex items-center justify-between gap-5 pb-2">
        <div className="flex items-center space-x-4 w-full">
          <Link to={"/"}>
            <h1 className="text-lg font-semibold bg-gradient-to-r to-primary from-gray-900 bg-clip-text text-transparent">
              LysterPro
            </h1>
          </Link>
          <div className="relative flex-grow hidden md:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Job title, keyword, company"
              className="pl-10 pr-4 py-2 max-w-xl text-gray-600 focus-visible:ring-0"
            />
          </div>
        </div>

        {/** Auth section */}
        <div className="w-full flex items-center justify-end space-x-4">
          {isAuthenticated ? (
            <>
              <div className="flex flex-col justify-center">
                <span className="text-gray-900 text-nowrap">
                  Welcome {user?.firstName}
                </span>
                <span className="text-sm leading-3 text-gray-600">
                  {user?.email}
                </span>
              </div>
              <Button
                variant="outline"
                className="text-sm bg-red-600/90 hover:bg-red-600 text-white hover:text-white font-semibold"
                onClick={logout}
              >
                Log Out
              </Button>
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
