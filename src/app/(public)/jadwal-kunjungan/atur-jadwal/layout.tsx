import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atur Jadwal Kunjungan | Empanti - Panti Asuhan Dr. J. Lucas',
  description:
    'Pilih waktu terbaik untuk bertemu dengan anak-anak dan berbagi kebahagiaan di Empanti. Jadwalkan kunjungan kasih Anda secara transparan.',
};

export default function AturJadwalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
