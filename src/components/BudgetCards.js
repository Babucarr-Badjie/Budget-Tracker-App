import React from "react";
import {
  calculateSpendings,
  formatPercentage,
  globalCurrency,
} from "../storageHelper";

export default function BudgetCards({ budget }) {
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
    </div>
  );
}
