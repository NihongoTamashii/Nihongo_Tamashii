import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Memuat...</p>
    </div>
  );
}
