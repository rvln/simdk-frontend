import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donasi Finansial | Empanti - Panti Asuhan Dr. J. Lucas',
  description:
    'Wujudkan kepedulian Anda melalui donasi finansial transparan ke Panti Asuhan Dr. J. Lucas. Transaksi 100% aman dan dapat dilacak via Midtrans.',
};

export default function DonasiFinansialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
