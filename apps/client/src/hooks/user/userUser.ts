import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginInFormValue, SignUpFormValue } from "~/component/authentication";

import { FALLBACK_ID, QUERY_KEY } from "~/constant";
import { onUserLogin, onUserSignUp, verifyAuth } from "~/services";
import { getUser, getUserFriends, handleFollow } from "~/services/user";
import { User, UserFollowPayload, UserResponse } from "~/types/interface";

export const useVerifyAuth = () => {
  return useQuery<User>({
    retry: false,
    queryKey: [QUERY_KEY.USER],
    queryFn: verifyAuth,
  });
};

export const useUserFriend = (id: number, status: string) => {
  return useQuery<User[]>({
    retry: false,
    queryKey: [QUERY_KEY.FRIENDS, status],
    queryFn: () => getUserFriends(id, status),
    enabled: id !== FALLBACK_ID,
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

export const useUserFollow = () => {
  return useMutation({
    retry: false,
    mutationFn: (payload: UserFollowPayload) => handleFollow(payload),
  });
};

export const useUser = (userId: number) => {
  return useQuery<User>({
    retry: false,
    queryKey: [QUERY_KEY.USER, userId],
    queryFn: () => getUser(userId),
    enabled: userId !== FALLBACK_ID,
  });
};
