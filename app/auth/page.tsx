'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AetherHero from '@/components/main/hero/AetherHero';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09A6.97 6.97 0 0 1 5.47 12c0-.72.13-1.43.37-2.09V7.07H2.18A11.96 11.96 0 0 0 .96 12c0 1.94.46 3.77 1.22 5.33l2.66-3.24Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97.96 12 .96 7.7.96 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main className="relative flex h-screen overflow-hidden bg-black">
      {/* Shader background */}
      <div className="absolute inset-0 z-0">
        <AetherHero
          title=""
          subtitle=""
          ctaLabel=""
          height="100%"
          overlayGradient="linear-gradient(180deg, #000000cc, #00000066 40%, #000000aa)"
        />
      </div>

      {/* ── Left Panel (3fr) ── */}
      <div className="hidden md:flex md:flex-col relative z-10" style={{ flex: 3 }}>
        {/* Top: YouTube embed */}
        <div className="relative flex-1 min-h-0">
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
          <iframe
            src="https://www.youtube.com/embed/mhVgh640FUw?start=217&autoplay=1&mute=1&loop=1&playlist=mhVgh640FUw&controls=0&showinfo=0&modestbranding=1"
            title="Nailart AI demo"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-none"
          />
        </div>

        {/* Bottom: NAILART oversized display */}
        <div className="relative px-10 py-8 flex items-end">
          <h1
            className="text-white font-black leading-none tracking-tighter select-none"
            style={{
              fontSize: 'clamp(4rem, 8vw, 9rem)',
              letterSpacing: '-0.06em',
              lineHeight: 0.85,
            }}
          >
            NAILART
          </h1>
        </div>
      </div>

      {/* ── Right Panel (2fr) ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6"
        style={{
          flex: 2,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
          boxShadow: '-1px 0 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Back link */}
        <a
          href="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-150 no-underline text-sm"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back
        </a>

        {/* Login card */}
        <div className="w-full max-w-[380px] text-center text-white">
          {/* Logo */}
          <Image
            src="/nailart.jpg"
            alt="Nailart AI"
            width={56}
            height={56}
            className="rounded-2xl mx-auto block"
          />

          <h2
            className="mt-5 mb-2 text-[1.75rem] font-bold tracking-tight leading-tight"
          >
            Nailart AI
          </h2>

          <p className="mb-9 text-[0.95rem] text-white/50 leading-relaxed">
            Google 계정으로 간편하게 시작하세요
          </p>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-[14px] border-none text-white text-base font-semibold cursor-pointer transition-all duration-200 hover:brightness-125"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05))',
              boxShadow:
                'inset 0 0 0 1px rgba(255,255,255,0.2), 0 8px 24px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(6px)',
              fontFamily: 'inherit',
            }}
          >
            <GoogleIcon />
            Google로 계속하기
          </button>

          <p className="mt-7 text-xs text-white/25 leading-relaxed">
            계속 진행하면 서비스 이용약관 및
            <br />
            개인정보 처리방침에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
