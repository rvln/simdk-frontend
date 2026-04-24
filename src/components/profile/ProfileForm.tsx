"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  MdOutlinePerson, 
  MdOutlineEmail, 
  MdOutlinePhone, 
  MdLockOutline,
  MdOutlineFileUpload,
  MdOutlineDelete,
  MdArrowBack
} from "react-icons/md";
import { useRouter } from "next/navigation";

export interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
}

export interface ProfileFormProps {
  roleLabel: string;
  defaultValues: ProfileFormData;
}

export default function ProfileForm({ roleLabel, defaultValues }: ProfileFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues
  });
  const router = useRouter();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const onSubmit = (data: ProfileFormData) => {
    alert(`Profil ${roleLabel} diperbarui:\n` + JSON.stringify(data, null, 2));
  };

  const currentFullName = watch("fullName");
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  const initials = getInitials(currentFullName);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tombol Kembali */}
      <button 
        type="button"
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-gray-500 hover:text-teal-700 transition-colors font-medium mb-8"
      >
        <MdArrowBack className="text-xl" />
        Kembali
      </button>

      {/* Header Profil */}
      <div className="bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-3xl p-8 flex items-center gap-8 border-none">
        {/* Avatar Besar */}
        <div className="w-28 h-28 rounded-full overflow-hidden shadow-sm flex-shrink-0 bg-teal-100 flex items-center justify-center border-none">
           {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
           ) : (
              <span className="text-4xl font-bold text-teal-700">{initials}</span>
           )}
        </div>
        
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">{currentFullName || defaultValues.fullName}</h1>
          {/* Badge Role */}
          <span className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold tracking-wider uppercase rounded-full shadow-sm">
            {roleLabel}
          </span>
        </div>
      </div>

      {/* Card Informasi Akun */}
      <div className="bg-white/80 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-3xl p-8 border-none">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Informasi Akun</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Bagian Ubah Foto Profil */}
          <div>
            <p className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-4">Foto Profil</p>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm bg-teal-50 flex items-center justify-center border-none">
                 {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                 ) : (
                    <span className="text-2xl font-bold text-teal-700">{initials}</span>
                 )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                  <label className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-teal-50 text-teal-700 text-sm font-bold rounded-xl shadow-sm hover:bg-teal-100 transition-colors border-none">
                    <MdOutlineFileUpload className="text-lg" />
                    Unggah Baru
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                  <button type="button" className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-red-600 text-sm font-bold rounded-xl shadow-sm hover:bg-red-50 transition-colors border-none">
                    <MdOutlineDelete className="text-lg" />
                    Hapus
                  </button>
                </div>
                <p className="text-[10px] text-gray-400">JPG, GIF atau PNG. Maksimal ukuran 2MB.</p>
              </div>
            </div>
          </div>

          {/* Fields Grid */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdOutlinePerson className="text-gray-400 text-lg" />
                </div>
                <input 
                  {...register("fullName", { required: "Nama lengkap wajib diisi" })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Email (Disabled) */}
            <div>
              <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">Alamat Email (Akun Utama)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdOutlineEmail className="text-gray-400 text-lg opacity-60" />
                </div>
                <input 
                  {...register("email")}
                  disabled
                  className="w-full pl-11 pr-4 py-3 bg-slate-100/70 border-none rounded-xl text-sm text-gray-400 cursor-not-allowed select-none shadow-sm"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 italic">Email ini terhubung dengan Google Workspace Panti dan tidak dapat diubah di sini.</p>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">Nomor WhatsApp</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdOutlinePhone className="text-gray-400 text-lg" />
                </div>
                <input 
                  {...register("phone", { required: "Nomor WhatsApp wajib diisi" })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            
          </div>

          {/* Ubah Password Link */}
          <div className="pt-2 pb-6 border-b border-gray-100/50">
            <button type="button" className="flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors">
              <MdLockOutline className="text-lg" />
              Ubah Password Akses
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-2">
            <button type="button" className="px-6 py-3 bg-transparent text-gray-500 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors border-none">
              Batal
            </button>
            <button type="submit" className="px-8 py-3 bg-teal-700 text-white font-bold text-sm rounded-xl shadow-[0_4px_14px_rgba(15,118,110,0.3)] hover:-translate-y-0.5 transition-all border-none">
              Simpan Perubahan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
