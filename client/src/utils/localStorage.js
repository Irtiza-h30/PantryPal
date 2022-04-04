import { isTokenExpired } from "./jwt";
import { AUTH_TOKEN } from "constants";

export const setItem = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

export const getItem = (key) => {
  let value = null;
  try {
    value = JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return null;
  }

  return value;
};

export const getToken = () => {
  const token = getItem(AUTH_TOKEN);
  if (token) {
    if (!isTokenExpired(token)) {
      return token;
    }
  }
  return null;
};

export const deleteToken = () => {
  removeItem(AUTH_TOKEN);
};

export const setToken = (token) => {
  setItem(AUTH_TOKEN, token);
};
