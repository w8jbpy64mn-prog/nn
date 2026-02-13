export function AboutSection() {
  return (
    <section className="executive-card space-y-6">
      <h2 className="text-2xl font-semibold">About</h2>
      <p className="text-zinc-300">
        Executive chef with strategic operations expertise, specialized in nutrition-focused menu engineering, scalable SOP architecture, and smart restaurant systems.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {['Culinary Leadership', 'Operational Systems', 'Digital Transformation', 'Data-Driven Menu Engineering'].map((skill, i) => (
          <div key={skill}>
            <div className="mb-2 flex justify-between text-sm"><span>{skill}</span><span>{85 + i * 3}%</span></div>
            <div className="h-2 rounded-full bg-zinc-800"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${85 + i * 3}%` }} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}
