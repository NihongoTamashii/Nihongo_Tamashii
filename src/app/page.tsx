import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Pencil } from 'lucide-react';

export default function Home() {
  const menuItems = [
    {
      href: '/learn',
      title: 'Menghapal Kotoba',
      description: 'Gunakan flashcard untuk menghapal kosakata baru.',
      icon: BookOpen,
    },
    {
      href: '/practice',
      title: 'Latihan Kotoba',
      description: 'Uji pengetahuan kosakata Anda dengan latihan interaktif.',
      icon: Pencil,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-8 pt-10">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">
          Selamat Datang di Nihongo Tamashii
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Pilih mode belajar untuk memulai.
        </p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.title} className="group">
            <Card className="h-full transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <item.icon className="h-10 w-10 text-primary" />
                <CardTitle className="text-2xl font-bold font-headline">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
