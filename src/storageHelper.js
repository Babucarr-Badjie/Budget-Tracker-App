//  ================= Local storage ==============

export const fetchLocalData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// delete user
export const deleteUser = ({ key }) => {
  return localStorage.removeItem(key);
};

// create Budget
export const createBudget = ({ name, amount }) => {
  const newBudget = {
    id: crypto.randomUUID(),
    name: name,
    createdTime: Date.now(),
    amount: +amount,
  };
  const existingBudget = fetchLocalData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudget, newBudget])
  );
};

// create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name,
    createdTime: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpense = fetchLocalData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpense, newExpense])
  );
};

// Formating currency function
export const globalCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

// Budget and spending
export const calculateSpendings = (budgetId) => {
  const spendings = fetchLocalData("expenses") ?? [];
  const amountSpentByBudget = spendings.reduce((acc, expense) => {
    // check if expense Id is equals to budget Id
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to the total
    return (acc += expense.amount);
  }, 0);
  return amountSpentByBudget;
};

// formating percentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
