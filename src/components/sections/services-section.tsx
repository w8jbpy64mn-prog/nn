'use client';

import { services } from '@/data/mock';
import { motion } from 'framer-motion';

export function ServicesSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Services</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <motion.article whileHover={{ y: -6, rotateX: 2 }} key={service.id} className="executive-card cursor-pointer transition-transform">
            <p className="text-2xl">{service.icon}</p>
            <h3 className="mt-4 text-lg font-medium">{service.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{service.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
