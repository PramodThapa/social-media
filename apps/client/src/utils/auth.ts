import { ROUTE } from "~/constant/route";
import { clearUserInfoFromLocalStorage } from "~/services/localStorage";

export const logOut = () => {
  clearUserInfoFromLocalStorage();
  window.location.href = ROUTE.AUTH;
};
