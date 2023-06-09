import { Link, useLoaderData } from "react-router-dom";
import {
  createBudget,
  createExpense,
  deleteExpense,
  fetchLocalData,
} from "../storageHelper";
import Content from "../components/Content";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetCards from "../components/BudgetCards";
import ExpensesTable from "../components/ExpensesTable";

// ============Dashboard loader function ============
export function dashBoardLoader() {
  const userName = fetchLocalData("userName");
  const budgets = fetchLocalData("budgets");
  const expenses = fetchLocalData("expenses");

  return { userName, budgets, expenses };
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

      return toast.success("You have successfully created your Budget");
    } catch (error) {
      throw new Error("Your budget couldn't be created, please try again");
    }
  }

  // add expense submission
  if (_action === "createNewExpense") {
    try {
      // create the expense
      createExpense({
        name: values.addNewExpense,
        amount: values.addNewExpenseAmount,
        budgetId: values.addNewExpenseBudget,
      });

      return toast.success(
        `You have successfully added ${values.addNewExpense} to your Budget`
      );
    } catch (error) {
      throw new Error("Your expense couldn't be created, please try again");
    }
  }

  // delete expense
  if (_action === "deleteExpense") {
    try {
      // delete Expense from the local storage
      deleteExpense({ key: "expenses", id: values.expenseId });

      return toast.success("Expense deleted");
    } catch (error) {
      throw new Error("Your expense couldn't be deleted, please try again");
    }
  }
}

export default function DashBoard() {
  const { userName, budgets, expenses } = useLoaderData();
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
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h1 className="font-extrabold text-xl mt-4">
                  Existing Budgets
                </h1>
                <div className="existing-budgets">
                  {budgets.map((budget) => (
                    <BudgetCards key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid w-full gap-5">
                    <h1 className="font-extrabold text-xl mt-4">
                      Recent Expenses
                    </h1>
                    <ExpensesTable
                      expenses={expenses
                        .sort(
                          (previous, recent) =>
                            recent.createdTime - previous.createdTime
                        )
                        .slice(0, 8)}
                    />

                    {/* show a Link to expenses */}
                    {expenses.length > 4 && (
                      <Link to="expenses" className="create-budget-button">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid w-full gap-4">
                <p>Personal budgeting is the secret to financial freedom</p>
                <p>Start your journey now!</p>
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
