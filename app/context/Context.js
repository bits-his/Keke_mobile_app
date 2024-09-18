// MyContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState("Default Value");
  const [token,setToken] = useState("")

  return (
    <AuthContext.Provider value={{ user, setUser,token,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { Provider, AuthContext };
