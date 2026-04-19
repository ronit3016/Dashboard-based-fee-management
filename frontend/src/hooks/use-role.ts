"use client";

import { useUser } from "@/context/UserContext";

export function useRole() {
  const { role, setRole, isLoading } = useUser();

  return {
    role,
    setRole,
    isLoading,
    isAdmin: role === "admin",
    isClient: role === "client",
  };
}
