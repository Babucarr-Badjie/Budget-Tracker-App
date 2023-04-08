//  ================= Local storage ==============

export const fetchLocalData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// delete user
export const deleteUser = ({ key }) => {
  return localStorage.removeItem(key);
};

// generating random colors for eact budget
const generateRandomColor = () => {
  const existingBudgetLength = fetchLocalData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// create Budget
export const createBudget = ({ name, amount }) => {
  const newBudget = {
    id: crypto.randomUUID(),
    name: name,
    createdTime: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
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
