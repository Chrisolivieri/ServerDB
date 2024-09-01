import { createContext, useState } from "react";

export const AuthrContextProvider = createContext();

export default function AuthrContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authorInfo, setAuthorInfo] = useState();
  const value = { token, setToken, authorInfo };
  return (
    <AuthrContext.Provider value={value}>{children}</AuthrContext.Provider>
  );
}
