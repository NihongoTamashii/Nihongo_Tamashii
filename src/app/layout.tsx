import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Nihongo Tamashii',
  description: 'A simple app to learn Japanese vocabulary.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body text-foreground antialiased'
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <div className="container relative py-6 lg:py-10">{children}</div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
