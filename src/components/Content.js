import { Form } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import chart from "../assets/chartLogo.png";

export default function Content() {
  return (
    <div className="grid items-center justify-center mt-10">
      <div className="text-center">
        <h1 className="text-2xl leading-10">Manage and control your Finance</h1>
        <p className="leading-10">
          Personal budgeting is the secret to Financial freedom. Start managing
          your Finance now!
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            placeholder="What is your name?"
            required
            aria-label="Your name"
            autoComplete="given-name"
            className="user-registration"
          />

          <input type="hidden" name="_action" value="newUser" />

          <button type="submit" className="button">
            Create Account
            <span className="p-1">
              <FaUserCircle />
            </span>
          </button>
        </Form>
      </div>
      <img src={chart} alt="chartImage" width={600} />
    </div>
  );
}
