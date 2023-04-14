import { toast } from "react-toastify";
import { deleteExpense, getMatchingItems } from "../storageHelper";
import { redirect } from "react-router-dom";

export default function DeleteBudget({ params }) {
  try {
    deleteExpense({ key: "budgets", id: params.id });

    const relatedExpense = getMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });
    relatedExpense.forEach((expense) => {
      deleteExpense({ key: "expenses", id: expense.id });
    });
    toast.success(`Budget deleted successfully`);
  } catch (error) {
    throw new Error("Your Budget couldn't be deleted, please try again!");
  }
  return redirect("/");
}
