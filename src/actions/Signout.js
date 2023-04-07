
import { redirect } from "react-router";
import { deleteUser } from "../storageHelper";
import { toast } from "react-toastify";

export async function signoutAction() {
  // delete the user
  deleteUser({
    key: "userName",
  });
  toast.success(`Your account is successfully deleted!`);

  // redirect the user after signout
  return redirect("/");
}
