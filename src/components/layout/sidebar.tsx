'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  ['Dashboard', '/dashboard'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Projects', '/projects'],
  ['Media', '/media'],
  ['Contact', '/contact'],
];

export function Sidebar({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="glass fixed left-4 top-4 z-30 hidden h-[calc(100vh-2rem)] w-64 rounded-3xl p-5 lg:block">
      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-emerald-200/70">Navigation</p>
      <nav className="space-y-2">
        {items.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={`block rounded-xl px-4 py-3 text-sm transition ${pathname === href ? 'bg-emerald-600/30 text-white shadow-glow' : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-emerald-200'}`}
          >
            {label}
          </Link>
        ))}
        {isAdmin && (
          <Link href="/admin" className="block rounded-xl px-4 py-3 text-sm text-amber-300 hover:bg-amber-400/10">
            Settings
          </Link>
        )}
      </nav>
    </aside>
  );
}
