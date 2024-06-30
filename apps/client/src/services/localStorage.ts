import { LocalStorageKeys } from "~/types";
import { Token, User } from "~/types/interface";

/**
 *
 * @param {Token} token JWT token.
 * @param {User} user User details.
 */
export const addUserToLocalStorage = (token: Token, user: User) => {
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

  return null;
};

/**
 * Clears the user info from local storage.
 */
export const clearUserFromLocalStorage = () => {
  localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
  localStorage.removeItem(LocalStorageKeys.USER);
};
