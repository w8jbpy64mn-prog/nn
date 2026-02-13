import { socialLinks } from '@/data/mock';

export function MediaSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Media & Social Hub</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {socialLinks.filter((item) => item.visible).map((item) => (
          <a key={item.id} href={item.url} className="executive-card block text-center hover:shadow-glow" target="_blank">
            <p className="text-lg font-medium">{item.platform}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
