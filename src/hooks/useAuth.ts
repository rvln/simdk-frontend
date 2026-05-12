"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Strict role values returned by the backend RoleEnum.
 * MUST match App\Enums\RoleEnum exactly.
 */
export type UserRole = "PENGUNJUNG" | "PENGURUS_PANTI" | "KEPALA_PANTI";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  email_verified_at: string | null;
}

export interface AuthState {
  /** The authenticated user object, or null if loading/unauthenticated */
  user: AuthUser | null;
  /** True while the initial fetch is in-flight */
  isLoading: boolean;
  /** True if a valid token exists AND the user fetch succeeded */
  isAuthenticated: boolean;
  /** Re-fetch the user (e.g., after profile update) */
  refetch: () => void;
}

/**
 * useAuth — Central authentication hook.
 *
 * On mount, checks localStorage for `auth_token`.
 * If present, fetches `GET /api/user` to obtain the server-authoritative
 * user object (including `role`). All RBAC decisions derive from this.
 *
 * This hook is intentionally stateless across components (no React Context)
 * to keep the implementation minimal and scope-controlled per AGENTS.md §6.
 */
export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        // Token expired or revoked — clean up silently
        localStorage.removeItem("auth_token");
        window.dispatchEvent(new Event("storage"));
        setUser(null);
        setIsLoading(false);
        return;
      }

      const json = await res.json();
      setUser(json.data as AuthUser);
    } catch {
      // Network failure — don't clear token (may be temporary)
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();

    // Listen for storage changes (e.g., logout in another tab)
    const handleStorageChange = () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setUser(null);
        setIsLoading(false);
      } else {
        fetchUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fetchUser]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    refetch: fetchUser,
  };
}
