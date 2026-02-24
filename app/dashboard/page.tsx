'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import PromptArea from '@/components/dashboard/PromptArea';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: '#181818' }}>
        <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: '#181818' }}>
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <DashboardNavbar />

      {/* Centered prompt */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <PromptArea />
      </main>
    </div>
  );
}
