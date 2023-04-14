import { useLoaderData } from "react-router-dom";
import {
  createExpense,
  deleteExpense,
  getMatchingItems,
} from "../storageHelper";
import BudgetCards from "../components/BudgetCards";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpensesTable from "../components/ExpensesTable";
import { toast } from "react-toastify";

// Budget page loader function
export async function BudgetLoader({ params }) {
  const budget = await getMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  //   check if budget exist
  if (!budget) {
    throw new Error(`That budget doesn't exist!`);
  }
  return { budget, expenses };
}

//  Budget page action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

export default function Budget() {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid w-full gap-4">
      <h1 className="font-extrabold text-xl">
        <span className="text-colorOne">{budget.name}</span> Budget Overview
      </h1>
      <div className=" flex flex-wrap justify-center gap-4">
        <BudgetCards budget={budget} showDeleteBudget={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid w-full gap-4">
          <h1 className="font-extrabold text-xl">
            <span>{budget.name}</span> Expenses
          </h1>
          <ExpensesTable expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
}
