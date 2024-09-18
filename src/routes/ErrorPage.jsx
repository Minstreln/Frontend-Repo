import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-5 p-10 rounded-lg shadow-lg">
        <h1 className="text-6xl text-primary">Oops!</h1>
        <p className="text-lg text-gray-600">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-lg text-gray-600">
          <i>{error.statusText || error.message}</i>
        </p>

        <Link
          to="/"
          className="bg-primary text-primary-foreground px-4 py-2 rounded shadow-md font-semibold"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
