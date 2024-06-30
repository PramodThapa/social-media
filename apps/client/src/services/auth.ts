import { LoginInFormValue, SignUpFormValue } from "~/component/authentication";
import { axiosConfig, http } from ".";
import axios, { AxiosResponse } from "axios";
import { endpoints } from "~/constant";
import { interpolate } from "~/utils";
import { User } from "~/types/interface";

/**
 * Function to return axios instance for user login post method.
 *
 * @param {LoginInFormValue} payload Payload for user login.
 *
 * @returns {Promise<AxiosResponse>}
 */
export const onUserLogin = <T>(
  payload: LoginInFormValue
): Promise<AxiosResponse<T>> => {
  const url = interpolate(endpoints.LOGIN);

  return axios.post<T>(url, payload, { ...axiosConfig });
};

/**
 * Function to return axios instance for user sign up post method.
 *
 * @param {any} payload
 *
 * @returns {Promise<AxiosResponse>}
 */

export const onUserSignUp = <T>(
  payload: SignUpFormValue
): Promise<AxiosResponse<T>> => {
  const url = interpolate(endpoints.SIGNUP);

  return axios.post<T>(url, payload, {
    ...axiosConfig,
  });
};

export const verifyAuth = async (): Promise<User> => {
  const url = interpolate(endpoints.ME);

  const response = await http.get(url);

  return response.data.user;
};

/**
 * Function to refresh access token.
 *
 * @param {any} payload
 * @returns {Promise<any>}
 */
export const refreshAccessToken = ({ id, refreshToken }: any): Promise<any> => {
  const payload = { id };
  const url = interpolate(endpoints.ACCESS_TOKEN);

  return axios.post(url, payload, {
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};
