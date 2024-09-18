"use client";

import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment.split("-").join(" ");
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);

    return {
      label: capitalizedLabel,
      href,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="inline-flex items-center">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium",
                index === breadcrumbItems.length - 1
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              )}
              aria-current={
                index === breadcrumbItems.length - 1 ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
