import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginInFormValue, SignUpFormValue } from "~/component/authentication";

import { QUERY_KEY } from "~/constant";
import { onUserLogin, onUserSignUp, verifyAuth } from "~/services";
import { User, UserResponse } from "~/types/interface";

export const useVerifyAuth = () => {
  return useQuery<User>({
    retry: false,
    queryKey: [QUERY_KEY.USER],
    queryFn: verifyAuth,
  });
};

export const useUserLogin = () => {
  return useMutation({
    retry: false,
    mutationFn: (payload: LoginInFormValue) =>
      onUserLogin<UserResponse>(payload),
  });
};

export const useUserSignup = () => {
  return useMutation({
    retry: false,
    mutationFn: (payload: SignUpFormValue) =>
      onUserSignUp<UserResponse>(payload),
  });
};
