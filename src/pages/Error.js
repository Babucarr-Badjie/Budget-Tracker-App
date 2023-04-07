import { Link, useNavigate, useRouteError } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

export default function Error() {
  const error = useRouteError();
  const navigateBack = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <h1 className="text-3xl">Oops! We encountered a problem!</h1>
      <p>{error.message || error.statusText}</p>

      {/* create options for the user when there's an error */}
      <div className="flex gap-5 mt-3">
        <button className="button" onClick={() => navigateBack(-1)}>
          <span className="p-1">
            <RiArrowGoBackFill />
          </span>
          Go Back
        </button>
        <Link to="/" className="button">
          <span className="p-1">
            <FaHome />
          </span>
          Go Home
        </Link>
      </div>
    </div>
  );
}
