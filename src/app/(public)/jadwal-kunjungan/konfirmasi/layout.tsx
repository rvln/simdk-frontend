import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konfirmasi Kunjungan | Empanti - Panti Asuhan Dr. J. Lucas',
  description:
    'Pengajuan kunjungan Anda telah berhasil dikirim. Kami akan meninjau jadwal dan mengirimkan konfirmasi melalui email.',
};

export default function KonfirmasiKunjunganLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
