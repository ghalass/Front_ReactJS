import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  user: "ghalass",
  token: null,
  token_expire: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token_expire, setToken_expire] = useState(
    localStorage.getItem("ACCESS_TOKEN_EXPIRE")
  );
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);

      // Set the expiration duration (e.g., 60 minutes)
      const expiresInMinutes = 60;
      // Calculate expiration time in milliseconds
      const expiresAt = new Date().getTime() + expiresInMinutes * 60 * 1000;
      localStorage.setItem("ACCESS_TOKEN_EXPIRE", expiresAt);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("ACCESS_TOKEN_EXPIRE");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        token_expire,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
