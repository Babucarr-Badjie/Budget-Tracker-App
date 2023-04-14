import { redirect } from "react-router";
import { deleteUser } from "../storageHelper";
import { toast } from "react-toastify";

export async function signoutAction() {
  // delete the user information and data
  deleteUser({
    key: "userName",
  });
  deleteUser({
    key: "budgets",
  });
  deleteUser({
    key: "expenses",
  });
  toast.success(`Your account is successfully deleted!`);

  // redirect the user after signout
  return redirect("/");
}
