import { useLoaderData } from "react-router-dom";
import { deleteExpense, fetchLocalData } from "../storageHelper";
import ExpensesTable from "../components/ExpensesTable";
import { toast } from "react-toastify";

export async function viewExpensesLoader() {
  const expenses = fetchLocalData("expenses");

  return { expenses };
}

// view expenses action
export async function viewExpensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

export default function ViewExpenses() {
  const { expenses } = useLoaderData();
  return (
    <div className="grid w-[100%] gap-2 mt-6">
      <h1 className="flex justify-center font-extrabold text-xl">
        All Expenses
      </h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid w-[100%] gap-2">
          <h3 className="font-bold">
            Your recent expenses <small>({expenses.length}) in total</small>
          </h3>
          <ExpensesTable expenses={expenses} />
        </div>
      ) : (
        <p>You have no expenses</p>
      )}
    </div>
  );
}
