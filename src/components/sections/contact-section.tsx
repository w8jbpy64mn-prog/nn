export function ContactSection() {
  return (
    <section className="executive-card max-w-3xl space-y-4">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <p className="text-zinc-300">For consulting, restaurant transformation, and premium collaborations.</p>
      <form className="grid gap-3">
        <input className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-3" placeholder="Name" />
        <input className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-3" placeholder="Email" />
        <textarea className="rounded-xl border border-zinc-700 bg-zinc-900/60 p-3" placeholder="Project brief" rows={4} />
        <button className="rounded-xl bg-emerald-600 px-4 py-3">Send</button>
      </form>
    </section>
  );
}
