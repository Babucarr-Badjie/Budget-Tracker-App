import { useLoaderData } from "react-router-dom";
import { createBudget, fetchLocalData } from "../storageHelper";
import Content from "../components/Content";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";

// ============Dashboard loader function ============
export function dashBoardLoader() {
  const userName = fetchLocalData("userName");
  const budgets = fetchLocalData("budgets");
  return { userName, budgets };
}
// ============Dashboard action function ============
export async function dashBoardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}`);
    } catch (error) {
      throw new Error(
        `There was a problem creating your account, please try again.`
      );
    }
  }

  // create budget submission
  if (_action === "createBudget") {
    try {
      // create the budget
      createBudget({
        name: values.addBudgetName,
        amount: values.addBudgetAmount,
      });

      return toast.success("Your have successfully created your Budget");
    } catch (error) {
      throw new Error("Your budget couldn't be created, please try again");
    }
  }
}
export default function DashBoard() {
  const { userName, budgets } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="grid items-start w-full gap-4 mt-6">
          <h1 className="text-2xl font-bold tracking-widest">
            Welcome back,{" "}
            <span className="text-cyan-600 capitalize">{userName}</span>{" "}
          </h1>{" "}
          <div className="grid w-full gap-4">
            {budgets && budgets.length > 0 ? (
              <div className="grid w-full, gap-4">
                <div className="flex flex-wrap items-start gap-4">
                  <AddBudgetForm />
                </div>
              </div>
            ) : (
              <div className="grid w-full gap-4">
                <p>Personal budgeting is the secret to financial freedom</p>
                <p>Start your journey now!</p>
                <p>come on</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Content />
      )}
    </>
  );
}
