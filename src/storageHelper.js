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

// formatting createdTime to locale string
export const formatCreatedTime = (date) => new Date(date).toLocaleDateString();

// Get all matching items from the local storage
export const getMatchingItems = ({ category, key, value }) => {
  const data = fetchLocalData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// deleting expense item
export const deleteExpense = ({ key, id }) => {
  const existingExpense = fetchLocalData(key);
  if (id) {
    const newData = existingExpense.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
