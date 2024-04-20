import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isUserHr:false,
  token:null,
  login: () => {},
  logout: () => {},
});
