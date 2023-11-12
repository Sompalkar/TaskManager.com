// UserContext.js
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // Initially, no user is logged in

  useEffect(() => {
    if (!user) {
      const { data } = axios.get("/profile").then(({ data }) => {
        setUser(data);
        // console.log(data);
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// const login = (userData) => {
//     setUser(userData); // Set the user data upon login
// };

// const logout = () => {
//     setUser(null); // Clear the user data upon logout
// };
