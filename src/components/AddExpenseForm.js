import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { GrFormAdd } from "react-icons/gr";

export default function AddExpenseForm({ budgets }) {
  // fetcher function
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const addExpenseFormRef = useRef();

  // refocus the form to expense name
  const focusFormRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      // clear the form
      addExpenseFormRef.current.reset();

      // refocus the form to expense name
      focusFormRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="budget-form">
      <h2 className="font-extrabold text-xl">
        Add new{" "}
        <span className="text-cyan-600 capitalize">
          {budgets.length === 1 && `${budgets.map((budget) => budget.name)}`}
        </span>{" "}
        Expenses
      </h2>
      <fetcher.Form
        method="post"
        ref={addExpenseFormRef}
        className="grid w-full gap-4"
      >
        <div className="expense-form-input">
          <div className="grid w-[100%] gap-2">
            <label htmlFor="addNewExpense">Expense Name</label>
            <input
              type="text"
              name="addNewExpense"
              id="addNewExpense"
              placeholder="e.g., transportation"
              required
              className="p-2 rounded-md"
              ref={focusFormRef}
            />
          </div>
          <div className="grid w-full gap-2">
            <label htmlFor="addNewExpenseAmount">Expense Amount</label>
            <input
              type="number"
              name="addNewExpenseAmount"
              id="addNewExpenseAmount"
              min={0}
              step={0.01}
              inputMode="decimal"
              placeholder="e.g., $ 20.01"
              required
              className="p-2 rounded-md"
            />
          </div>
        </div>
        <div className="grid w-full gap-2" hidden={budgets.length === 1}>
          <label htmlFor="addNewExpenseBudget">Budget Category</label>
          <select
            name="addNewExpenseBudget"
            id="addNewExpenseBudget"
            required
            className="p-2 rounded-md"
          >
            {budgets
              .sort((a, b) => a.createdTime - b.createdTime)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createNewExpense" />
        <button className="create-budget-button" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Adding expense..</span>
          ) : (
            <>
              Add Expense
              <span className="p-1">
                <GrFormAdd />
              </span>
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}
