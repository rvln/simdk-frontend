import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jadwal Kunjungan | Empanti - Panti Asuhan Dr. J. Lucas',
  description:
    'Lihat agenda kunjungan dan interaksi sosial di Panti Asuhan Dr. J. Lucas (Empanti). Jadwalkan kunjungan kasih Anda secara transparan.',
};

export default function JadwalKunjunganLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
