import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  currentUser: user ? user : null,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state]);
  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
