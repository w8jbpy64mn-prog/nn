'use client';

import { useState } from 'react';

const tabs = ['Profile Editor', 'Services Manager', 'Projects Manager', 'Social Media Editor', 'Website Settings'];

export function AdminDashboard() {
  const [tab, setTab] = useState(tabs[0]);

  return (
    <section className="executive-card">
      <h2 className="mb-6 text-2xl font-semibold">Executive Admin Dashboard</h2>
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`rounded-lg px-3 py-2 text-sm ${tab === item ? 'bg-emerald-600/40 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-zinc-700/60 bg-zinc-900/50 p-4 text-zinc-300">
        <p className="mb-2 font-medium text-white">{tab}</p>
        <p>
          Connected to Firebase collections: <code>profile</code>, <code>services</code>, <code>projects</code>, <code>social_links</code>, <code>settings</code>.
        </p>
      </div>
    </section>
  );
}
