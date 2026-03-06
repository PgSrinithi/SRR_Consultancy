import type { Metadata } from 'next';
import { Open_Sans, Montserrat } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const fontSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans-next',
  weight: ['300', '400', '500', '600', '700'],
});

const fontHeading = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading-next',
  weight: ['400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "SRR Consultancy - Manpower Solutions",
  description:
    "Your trusted partner for international recruitment and workforce management.",
  icons: {
    icon: "/assets/Logo.jpeg",
    shortcut: "/assets/Logo.jpeg",
    apple: "/assets/Logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontHeading.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
