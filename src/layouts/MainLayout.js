import { Outlet, useLoaderData } from "react-router-dom";
import { fetchLocalData } from "../storageHelper";
import Navbar from "../components/Navbar";

// ============MainLayout loader function ============
export function mainLayoutLoader() {
  const userName = fetchLocalData("userName");
  return { userName };
}

export default function MainLayout() {
  const { userName } = useLoaderData();
  return (
    <div>
      <Navbar userName={userName} />
      <Outlet />
    </div>
  );
}
