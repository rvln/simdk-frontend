"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MdLoop } from "react-icons/md";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Simpan token ke localStorage agar dikenali oleh useAuth hook
      localStorage.setItem("auth_token", token);
      
      // Beri event storage agar tab lain (jika ada) tahu ada perubahan login
      window.dispatchEvent(new Event("storage"));

      // Arahkan ke dashboard
      router.push("/dashboard");
    } else {
      // Jika tidak ada token, balik ke login
      router.push("/login?error=no_token");
    }
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <MdLoop className="text-5xl text-primary animate-spin" />
      <p className="text-on-surface-variant font-medium font-sans">
        Menyelesaikan autentikasi...
      </p>
    </div>
  );
}
