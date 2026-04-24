import React from "react";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilPengurusPantiPage() {
  const initialData = {
    fullName: "Budi Santoso",
    email: "pengurus@empanti.org",
    phone: "081987654321"
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20 px-6">
      <ProfileForm roleLabel="PENGURUS PANTI" defaultValues={initialData} />
    </div>
  );
}
