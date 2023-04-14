import { Form, NavLink } from "react-router-dom";
import homeLogo from "../assets/logo.svg";
import { FaTrashAlt } from "react-icons/fa";

export default function Navbar({ userName }) {
  return (
    <nav className="mb-8">
      <NavLink
        to="/"
        aria-label="Go to home page"
        className="flex items-center "
      >
        <div
          className="flex items-center p-2 hover:border-solid
          hover:border-2 hover:border-colorOne hover:rounded-lg"
        >
          <img src={homeLogo} width={40} alt="logo" />
          <span className="px-2 text-center tracking-widest">BUDGET </span>
        </div>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/Signout"
          onSubmit={(event) => {
            if (
              !window.confirm(
                `Do you want to delete ${userName} and all related data?`
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="delete-user-button">
            Delete user
            <span className="px-2">
              <FaTrashAlt />
            </span>
          </button>
        </Form>
      )}
    </nav>
  );
}
