'use client';

import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-8 h-16">
      {/* Left: Logo + Name */}
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

      {/* Right: Get Started button */}
      <Link
        href="#generate"
        className="px-5 py-2 rounded-xl text-white no-underline font-semibold text-sm backdrop-blur-md"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.28), 0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        Get Started
      </Link>
    </header>
  );
}
