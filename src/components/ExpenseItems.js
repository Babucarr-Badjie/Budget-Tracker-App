import { Link, useFetcher } from "react-router-dom";
import {
  formatCreatedTime,
  getMatchingItems,
  globalCurrency,
} from "../storageHelper";

import { FaTrashAlt } from "react-icons/fa";

export default function ExpenseItems({ expense, showBudget }) {
  const fetcher = useFetcher();

  const budget = getMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  return (
    <>
      <td className="text-center p-2">{expense.name}</td>
      <td className="text-center p-2">{globalCurrency(expense.amount)}</td>
      <td className="text-center p-2">
        {formatCreatedTime(expense.createdTime)}
      </td>
      {showBudget && (
        <td>
          <Link to={`/budget/${budget.id}`} className="budget-link">
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form
          method="post"
          onSubmit={(event) => {
            if (
              !window.confirm(`Do you want to delete ${expense.name} expense?`)
            ) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            aria-label={`Delete ${expense.name} expense`}
            className="delete-expense"
          >
            <FaTrashAlt size={15} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
}
