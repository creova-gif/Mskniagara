import { Loader2 } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
    </div>
  );
}
