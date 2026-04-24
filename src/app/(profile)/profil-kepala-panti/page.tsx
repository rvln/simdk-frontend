import React from "react";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilKepalaPantiPage() {
  const initialData = {
    fullName: "Ahmad Faisal",
    email: "kepala.panti@empanti.org",
    phone: "081234567890"
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20 px-6">
      <ProfileForm roleLabel="KEPALA PANTI" defaultValues={initialData} />
    </div>
  );
}
