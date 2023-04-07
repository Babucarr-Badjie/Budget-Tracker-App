import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard, { dashBoardAction, dashBoardLoader } from "./pages/DashBoard";
import Error from "./pages/Error";
import MainLayout, { mainLayoutLoader } from "./layouts/MainLayout";
import { signoutAction } from "./actions/Signout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        path: "signout",
        action: signoutAction,
      },
    ],
  },

  // {
  //   path: "*",
  //   element: <Error />,
  // },
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
