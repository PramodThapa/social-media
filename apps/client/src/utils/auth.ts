import { ROUTE } from "~/constant/route";
import { clearUserFromLocalStorage } from "~/services/localStorage";

export const logOut = () => {
  clearUserFromLocalStorage();
  window.location.href = ROUTE.AUTH;
};
