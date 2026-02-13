'use client';

import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function TopHeader() {
  const [dark, setDark] = useState(true);

  return (
    <header className="glass sticky top-4 z-20 mx-4 mb-6 flex items-center justify-between rounded-2xl px-6 py-4 lg:ml-72">
      <div>
        <p className="text-xs uppercase tracking-[0.23em] text-emerald-200/80">Chef Abdulrazzaq</p>
        <h1 className="text-lg font-semibold">Executive Chef & Smart Restaurant Systems Expert</h1>
      </div>
      <button
        onClick={() => setDark((prev) => !prev)}
        className="rounded-xl border border-zinc-600/80 p-2 text-zinc-200 transition hover:border-emerald-300"
        aria-label="Toggle theme"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
