/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const SidebarNav = ({
  activeItem = "overview",
  navItems,
  title,
  setIsOpen,
}) => {
  return (
    <nav className="bg-white w-full py-5">
      <h2 className=" text-gray-400 mb-4 text-xs pl-5 uppercase">{title}</h2>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={`/dashboard/${item.href}`}
            className={`flex items-center mb-2 p-2 pl-5 border-l-4 transition-all ${
              activeItem === item.name.toLowerCase()
                ? "bg-blue-100 text-blue-600 border-l-4 border-l-primary"
                : "text-gray-600 hover:bg-gray-100 border-l-white"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto bg-primary/10 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </nav>
  );
};

export default SidebarNav;
