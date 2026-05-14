"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MdLoop } from "react-icons/md";

// Komponen internal yang menangani logika token
function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Simpan token ke localStorage agar dikenali oleh useAuth hook
      localStorage.setItem("auth_token", token);

      // Beri event storage agar tab lain tahu ada perubahan login
      window.dispatchEvent(new Event("storage"));

      // Arahkan ke dashboard
      router.push("/dashboard");
    } else {
      // Jika tidak ada token (misal akses manual), balik ke login
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

// Komponen utama yang membungkus dengan Suspense
export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <MdLoop className="text-5xl text-primary animate-spin" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
