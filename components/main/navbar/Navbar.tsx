'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

type NavbarProps = {
  showBack?: boolean;
};

export default function Navbar({ showBack }: NavbarProps = {}) {
  const { user, loading, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-8 h-16">
      {/* Left: Logo or Back */}
      {showBack ? (
        <Link
          href="/"
          className="flex items-center gap-2 no-underline text-white/75 hover:text-white transition-colors duration-150"
        >
          <svg
            width="20"
            height="20"
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
          <span className="text-sm font-medium">Back</span>
        </Link>
      ) : (
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/nailart.jpg"
            alt="Nailart AI logo"
            width={32}
            height={32}
            className="rounded-lg object-cover"
          />
          <span className="text-white font-bold text-base tracking-tight">
            Nailart AI
          </span>
        </Link>
      )}

      {/* Center: Nav links */}
      <nav className="flex gap-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white/75 hover:text-white hover:bg-white/10 no-underline text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors duration-150"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right: Auth state */}
      {!loading && (
        user ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl no-underline text-white font-semibold text-sm backdrop-blur-md transition-all duration-150 hover:brightness-125"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.28), 0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt=""
                width={22}
                height={22}
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-[22px] h-[22px] rounded-full bg-white/25 flex items-center justify-center text-[10px] font-bold">
                {(user.user_metadata?.full_name?.[0] || user.email?.[0] || '?').toUpperCase()}
              </div>
            )}
            Dashboard
          </Link>
        ) : (
          <Link
            href="/auth"
            className="px-5 py-2 rounded-xl text-white no-underline font-semibold text-sm backdrop-blur-md"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.28), 0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            Get Started
          </Link>
        )
      )}
    </header>
  );
}
