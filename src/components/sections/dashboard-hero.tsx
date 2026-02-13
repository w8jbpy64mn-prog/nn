'use client';

import { motion } from 'framer-motion';

const stats = ['9+ Years Experience', '100+ Menu Designs', 'Smart Systems Developer', 'Operational Excellence Specialist'];

export function DashboardHero() {
  return (
    <section className="executive-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(251,191,36,.16),transparent_40%)]" />
      <div className="relative space-y-6">
        <p className="gold-accent text-sm uppercase tracking-[0.25em]">Executive Culinary Authority</p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Executive Culinary Leadership & Smart Restaurant Innovation
        </h2>
        <p className="max-w-2xl text-zinc-300">
          I build premium culinary operations where flavor artistry meets intelligent systems, driving profitable growth and world-class guest experiences.
        </p>
        <div className="flex flex-wrap gap-3">
          {['View My Work', 'Book Consultation', 'Download CV'].map((cta) => (
            <button key={cta} className="rounded-xl border border-emerald-400/40 bg-emerald-600/20 px-5 py-3 text-sm hover:bg-emerald-600/40">
              {cta}
            </button>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {stats.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="rounded-xl border border-zinc-700/60 bg-zinc-900/60 p-4">
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
