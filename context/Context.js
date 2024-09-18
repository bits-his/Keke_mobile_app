// MyContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState("Default Value");
  const [token,setToken] = useState("")
  const [balance,setBalance] = useState(0)

  return (
    <AuthContext.Provider value={{ user, setUser,token,setToken ,balance,setBalance}}>
      {children}
    </AuthContext.Provider>
  );
};

export { Provider, AuthContext };
