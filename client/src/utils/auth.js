const TOKEN_KEY = "bae-chatroom-userinfo";

export const setLogin = data => {
  localStorage.setItem(TOKEN_KEY, data);
};

export const setLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
