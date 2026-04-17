import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detail Pengunjung | Empanti - Panti Asuhan Dr. J. Lucas',
  description:
    'Lengkapi informasi diri Anda atau lembaga untuk memastikan proses kunjungan berjalan selaras dengan rutinitas anak-anak.',
};

export default function DetailKunjunganLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
