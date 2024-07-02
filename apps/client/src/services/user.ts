import { User, UserFollowPayload } from "~/types/interface";
import { http } from "./http";
import { interpolate } from "~/utils";
import { endpoints } from "~/constant";
import { AxiosResponse } from "axios";

export const getUserFriends = async (
  id: number,
  status: string
): Promise<User[]> => {
  const url = interpolate(endpoints.USER_FRIENDS, { id, status });

  const response: User[] = await http.get(url);

  return response;
};

/**
 * Handle user follow.
 *
 * @param {CreateBlogPayload} payload .
 *
 * @returns {Promise<AxiosResponse>}
 */
export const handleFollow = <T>(
  payload: UserFollowPayload
): Promise<AxiosResponse<T>> => {
  return http.post(endpoints.FOLLOW_USERS, payload);
};

export const getUser = async (id: number): Promise<User> => {
  const url = interpolate(endpoints.USER, { id });

  const response: User = await http.get(url);

  return response;
};
