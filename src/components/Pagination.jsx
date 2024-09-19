/* eslint-disable react/prop-types */

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-3 mt-8 text-gray-600">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full hover:bg-primary/10 hover:text-primary text-gray-600"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={currentPage === number ? "default" : "ghost"}
          className={`w-10 h-10 rounded-full ${
            currentPage === number ? "bg-primary text-primary-foreground" : ""
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full hover:bg-primary/10 hover:text-primary text-gray-600"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
