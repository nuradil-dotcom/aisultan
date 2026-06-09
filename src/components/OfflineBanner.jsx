import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed top-[calc(env(safe-area-inset-top)+3.25rem)] left-3 right-3 z-50 flex items-center gap-2 bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
      <WifiOff size={14} className="shrink-0" />
      <span>Офлайн режим — прогресс телефонда сақталады</span>
    </div>
  );
}
