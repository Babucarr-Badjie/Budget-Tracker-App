import React from "react";
import {
  calculateSpendings,
  formatPercentage,
  globalCurrency,
} from "../storageHelper";
import { Form, Link } from "react-router-dom";

export default function BudgetCards({ budget, showDeleteBudget = false }) {
  const { name, amount, id } = budget;

  //   amount spent
  const amountSpent = calculateSpendings(id);

  return (
    <div className="budget-cards">
      <div className="budget-card-list">
        <h2 className="text-md font-bold">{name}</h2>
        <p className="text-sm"> {globalCurrency(amount)} Budgeted</p>
      </div>
      <progress
        className="w-full h-[10px] overflow-hidden rounded-full"
        max={amount}
        value={amountSpent}
      >
        {formatPercentage(amountSpent / amount)}
      </progress>
      <div className="budget-card-list">
        <small>{globalCurrency(amountSpent)} spent</small>
        <small>{globalCurrency(amount - amountSpent)} remaining</small>
      </div>
      {showDeleteBudget ? (
        <div className="flex w-full gap-4 justify-center">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  `Do you want to permanently delete ${budget.name} budget?`
                )
              ) {
                event.preventDefault();
              }
            }}
            
          ><button type="submit" className="delete-expense">Delete Budget</button></Form>
        </div>
      ) : (
        <Link to={`/budget/${id}`} className="create-budget-button">
          <span>View Details</span>
        </Link>
      )}
    </div>
  );
}
