'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardNavbar() {
  const { user, signOut } = useAuth();
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowPopover(false);
      }
    }
    if (showPopover) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopover]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 pointer-events-none">
      {/* Logo — floating pill */}
      <Link
        href="/"
        className="pointer-events-auto flex items-center gap-2.5 px-3 py-2 rounded-2xl no-underline transition-all duration-200 hover:bg-white/[0.06]"
        style={{
          background: 'rgba(255,255,255,0.04)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Image
          src="/nailart.jpg"
          alt="Nailart AI"
          width={26}
          height={26}
          className="rounded-lg object-cover"
        />
        <span className="text-white font-semibold text-sm tracking-tight">
          Nailart AI
        </span>
      </Link>

      {/* Profile — floating pill with popover */}
      <div className="pointer-events-auto relative" ref={popoverRef}>
        <button
          onClick={() => setShowPopover(!showPopover)}
          className="flex items-center rounded-2xl p-1.5 cursor-pointer border-none transition-all duration-200 hover:bg-white/[0.06]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt=""
              width={30}
              height={30}
              className="rounded-xl"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-[30px] h-[30px] rounded-xl bg-white/10 flex items-center justify-center text-white text-xs font-semibold">
              {(user?.user_metadata?.full_name?.[0] || user?.email?.[0] || '?').toUpperCase()}
            </div>
          )}
        </button>

        {/* Popover */}
        {showPopover && (
          <div
            className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(40,40,40,0.92)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* User info */}
            <div className="px-4 py-3 flex items-center gap-3 border-b border-white/[0.06]">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt=""
                  width={36}
                  height={36}
                  className="rounded-xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white text-sm font-semibold">
                  {(user?.user_metadata?.full_name?.[0] || user?.email?.[0] || '?').toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {user?.user_metadata?.full_name || '사용자'}
                </p>
                <p className="text-white/40 text-xs truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Sign out */}
            <button
              onClick={() => { setShowPopover(false); signOut(); }}
              className="w-full px-4 py-2.5 text-left text-sm text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors duration-150 cursor-pointer bg-transparent border-none"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
