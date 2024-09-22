import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useCurrentPage = () => {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    const pathNames = pathSegments.map((segment) =>
      segment.split("-").join(" ")
    );
    const currentItem = pathNames.pop();
    if (currentItem === "") {
      setCurrentPage("home");
    } else if (currentItem === "dashboard") {
      setCurrentPage("overview");
    } else setCurrentPage(currentItem);
  }, [location.pathname]);
  return { currentPage };
};

export default useCurrentPage;
