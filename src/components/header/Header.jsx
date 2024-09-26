import MobileMenu from "./MobileMenu";
import { Button } from "../ui/button";
import { navItems } from "../../lib/navItems";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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
                className="text-sm bg-red-600/90 hover:bg-red-600 text-white hover:text-white font-semibold hidden sm:block"
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
