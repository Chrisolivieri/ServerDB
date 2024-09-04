//contesto per vedere se un utente è loggato

import { createContext, useEffect, useState } from "react";
import { fetchME } from "../data/fetch";

export const AuthorContext = createContext();

export default function AuthorContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token")); // token dell'utente loggato
  const [authorInfo, setAuthorInfo] = useState();
  const getMe = async () => {
    try {
      const meInfo = await fetchME();
      setAuthorInfo(meInfo);
    } catch (error) {
      if (error.message === "401"){
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  };
  useEffect(() => {
    if (token) getMe();
  }, [token]);
  const value = { token, setToken, authorInfo };
  return (
    <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
  );
}
