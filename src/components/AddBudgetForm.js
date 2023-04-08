import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function AddBudgetForm() {
  // react router useFetcher
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  // clear (reset) the add budget form after submitting
  const addBudgetFormRef = useRef();

  // refocus the form to Budget name
  const focusFormRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      // clear the form
      addBudgetFormRef.current.reset();

      // refocus the form to Budget name
      focusFormRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="budget-form">
      <h2 className="font-extrabold text-xl">Create Your Budget</h2>
      <fetcher.Form
        method="post"
        className="grid w-full gap-4"
        ref={addBudgetFormRef}
      >
        <div className="budget-form-input">
          <label htmlFor="addBudgetName">Budget Name</label>
          <input
            type="text"
            name="addBudgetName"
            id="addBudgetName"
            placeholder="e.g., Travel"
            required
            className="p-2 rounded-md"
            ref={focusFormRef}
          />
        </div>
        <div className="budget-form-input">
          <label htmlFor="newBudgetAmount">Budget Amount</label>
          <input
            type="number"
            min={0}
            step="0.01"
            name="addBudgetAmount"
            id="addBudgetAmount"
            placeholder="e.g., $200"
            required
            inputMode="decimal"
            className="p-2 rounded-md"
          />
        </div>

        <input type="hidden" name="_action" value="createBudget" />
        <button className="create-budget-button" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Creating budget..</span>
          ) : (
            <>
              Create Budget
              <span className="p-1">
                <RiMoneyDollarCircleLine />
              </span>
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}
