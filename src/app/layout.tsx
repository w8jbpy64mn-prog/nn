import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chef Abdulrazzaq | Executive Culinary Strategist',
  description: 'Premium authority platform for executive culinary leadership and smart restaurant systems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
