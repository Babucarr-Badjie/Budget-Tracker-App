import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard, { dashBoardAction, dashBoardLoader } from "./pages/DashBoard";
import Error from "./pages/Error";
import MainLayout, { mainLayoutLoader } from "./layouts/MainLayout";
import { signoutAction } from "./actions/Signout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewExpenses, {
  viewExpensesAction,
  viewExpensesLoader,
} from "./pages/ViewExpenses";
import Budget, { budgetAction, BudgetLoader } from "./pages/Budget";
import DeleteBudget from "./actions/DeleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLayoutLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashBoard />,
        loader: dashBoardLoader,
        action: dashBoardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ViewExpenses />,
        loader: viewExpensesLoader,
        action: viewExpensesAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <Budget />,
        loader: BudgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: DeleteBudget,
          },
        ],
      },
      {
        path: "signout",
        action: signoutAction,
      },
    ],
  },
]);
function App() {
  return (
    <div className="font-bodyFont p-[3%]">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
