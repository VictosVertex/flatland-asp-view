import type { Metadata } from 'next';
import './globals.css';
import AppHeader from '@flasp/app/_core/components/app-header';

export const metadata: Metadata = {
  title: 'FlatlandASP View',
  description: 'A frontent for FlatlandASP',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`base-scrollbar min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 via-[2000px] to-gray-900 to-[2400px] font-poppins text-white`}
      >
        <AppHeader />
        <main className="w-fill flex">{children}</main>
      </body>
    </html>
  );
}
