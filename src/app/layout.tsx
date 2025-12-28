import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import { AuthProvider } from '@/lib/amplify';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-libre-baskerville',
});

export const metadata: Metadata = {
  title: 'RIGLAN - Structural Analysis Documents',
  description:
    'RIGLAN publishes structured analytical documents. They describe systems through constraints, relations, and limits.',
  keywords: ['structural analysis', 'analytical documents', 'research', 'reports'],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${libreBaskerville.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}