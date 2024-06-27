import { LocalStorageKeys } from "~/types";

export interface User {
  id: string;
  username: string;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

/**
 *
 * @param {Token} token JWT token.
 * @param {User} user User details.
 */
export const addUserLoginToLocalStorage = (token: Token, user: User) => {
  localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, token.accessToken);
  localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, token.refreshToken);
  localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(user));
};

/**
 * Gets the token from the local storage
 */
export const getAccessTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
};

/**
 * Gets the token from the local storage
 */
export const getRefreshTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);
};

/**
 * Gets the user from the local storage.
 */
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(LocalStorageKeys.USER);

  if (user) {
    return JSON.parse(user);
  }

  return {};
};

/**
 * Clears the user info from local storage.
 */
export const clearUserInfoFromLocalStorage = () => {
  localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
  localStorage.removeItem(LocalStorageKeys.USER);
};
