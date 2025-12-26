import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';
import logoImage from "../public/assets/Logo.jpeg"

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
    <html lang="en">

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
