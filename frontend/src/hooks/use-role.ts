"use client";

import { useUser } from "@/context/UserContext";

export function useRole() {
  const { role, setRole, isLoading } = useUser();

  return {
    role,
    setRole,
    isLoading,
    isSuperAdmin: role === "super-admin",
    isAdmin: role === "super-admin" || role === "admin",
    isClient: role === "client",
  };
}
