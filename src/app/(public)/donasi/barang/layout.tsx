import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donasi Barang | Empanti - Panti Asuhan Dr. J. Lucas',
  description:
    'Ajukan donasi barang fisik ke Panti Asuhan Dr. J. Lucas (Empanti). Formulir pra-pengiriman dengan sistem dua-fase yang transparan.',
};

export default function DonasiBarangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
