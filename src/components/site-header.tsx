'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, Pencil, Home } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export function SiteHeader() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/learn', label: 'Menghapal Kotoba', icon: BookOpen },
    { href: '/practice', label: 'Latihan Kotoba', icon: Pencil },
  ];

  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-headline font-bold text-primary"
            >
              Kotoba Drill
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground'
                )}
              >
                <link.icon className="mr-2 h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center p-2 rounded-md text-lg font-medium',
                          pathname === link.href
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-secondary'
                        )}
                      >
                        <link.icon className="mr-3 h-6 w-6" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
