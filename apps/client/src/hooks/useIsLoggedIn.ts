import { useEffect, useMemo, useState } from "react";
import { getUserFromLocalStorage } from "~/services";
import { useVerifyAuth } from "./user/userUser";

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const localUser = useMemo(() => getUserFromLocalStorage(), []);

  const { data: user } = useVerifyAuth();

  useEffect(() => {
    if (localUser && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localUser, user]);

  return { isLoggedIn, user };
};

export default useIsLoggedIn;
