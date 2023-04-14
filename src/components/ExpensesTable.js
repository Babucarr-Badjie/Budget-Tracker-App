import ExpenseItems from "./ExpenseItems";

export default function ExpensesTable({ expenses, showBudget = true }) {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr className="odd:bg-gray-200">
            {["Name", "Amount", "Date", showBudget ? "Budget" : " ", " "].map(
              (items, index) => (
                <th className="text-center p-2" key={index}>
                  {items}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr className="odd:bg-gray-100" key={expense.id}>
              <ExpenseItems expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
