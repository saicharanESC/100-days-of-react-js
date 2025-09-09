import { createContext, useState } from "react";

// 1. Create context
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "Saicharan", loggedIn: true });

  return (
    // 2. Provide context value
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
