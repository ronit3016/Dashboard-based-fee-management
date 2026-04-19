"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "client";

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("client");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem("sweetops_role") as UserRole;
    if (savedRole && ["admin", "client"].includes(savedRole)) {
      setRoleState(savedRole);
    }
    setIsLoading(false);
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("sweetops_role", newRole);
  };

  return (
    <UserContext.Provider value={{ role, setRole, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
