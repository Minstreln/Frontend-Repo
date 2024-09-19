const PopularSearches = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <h3 className="text-gray-400">Popular Searches: </h3>
      <div className="text-gray-600 flex flex-wrap font-medium">
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          Fornt end
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          Back end
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          Development
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          PHP
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          Laravel
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          Bootstrap
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          Developer
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          Team Lead
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          Product Testing
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          JavaScript
        </span>
        <span className="hover:bg-gray-100 hover:text-gray-800 py-2 px-3 rounded">
          TypeScript
        </span>
      </div>
    </div>
  );
};

export default PopularSearches;
