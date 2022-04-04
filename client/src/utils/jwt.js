export const parseJwt = (token) => {
  const base64Url = token?.split(".")?.[1];
  try {
    return JSON.parse(window.atob(base64Url));
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const t = parseJwt(token);
  if (t.exp && Date.now() < t.exp * 1000) {
    return false;
  }
  return true;
};
