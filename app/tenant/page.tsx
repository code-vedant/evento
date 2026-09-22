import tenants from "../data/tenants.json";
import { notFound } from "next/navigation";

type Tenant = (typeof tenants)[number];

export default async function TenantPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;

  const tenant = tenants.find(
    (tenant) => tenant.slug === slug
  ) as Tenant | undefined;

  if (!tenant) {
    notFound();
  }

  return (
    <main
      className="min-h-screen bg-[#08080b] text-white"
      style={
        {
          "--tenant-accent": tenant.theme.accent,
        } as React.CSSProperties
      }
    >
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-black"
              style={{
                backgroundColor: tenant.theme.accent,
              }}
            >
              {tenant.navbar.logo}
            </div>

            <span className="font-semibold">
              {tenant.name}
            </span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {tenant.navbar.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <a
              href={tenant.navbar.cta.href}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-black"
              style={{
                backgroundColor: tenant.theme.accent,
              }}
            >
              {tenant.navbar.cta.label}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-20 blur-[150px]"
          style={{
            backgroundColor: tenant.theme.accent,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-32">
          <div className="max-w-3xl">
            <span
              className="inline-flex rounded-full border px-4 py-2 text-sm"
              style={{
                borderColor: `${tenant.theme.accent}40`,
                color: tenant.theme.accent,
                backgroundColor: `${tenant.theme.accent}10`,
              }}
            >
              {tenant.hero.badge}
            </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
              {tenant.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {tenant.hero.description}
            </p>

            <div className="mt-10 flex gap-4">
              <a
                href={tenant.hero.primaryCta.href}
                className="rounded-xl px-6 py-3 font-semibold text-black"
                style={{
                  backgroundColor: tenant.theme.accent,
                }}
              >
                {tenant.hero.primaryCta.label}
              </a>

              <a
                href={tenant.hero.secondaryCta.href}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold"
              >
                {tenant.hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-3">
          {tenant.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-r border-white/10 px-6 py-10 text-center"
            >
              <div
                className="text-4xl font-bold"
                style={{
                  color: tenant.theme.accent,
                }}
              >
                {stat.value}
              </div>

              <div className="mt-2 text-sm text-zinc-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="max-w-2xl">
          <p
            className="text-sm font-medium"
            style={{
              color: tenant.theme.accent,
            }}
          >
            {tenant.about.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {tenant.about.title}
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            {tenant.about.description}
          </p>

          <p className="mt-4 text-sm text-zinc-500">
            {tenant.about.location}
          </p>
        </div>
      </section>

      {/* Events */}
      <section
        id="events"
        className="border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p
            className="text-sm font-medium"
            style={{
              color: tenant.theme.accent,
            }}
          >
            {tenant.events.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {tenant.events.title}
          </h2>

          <p className="mt-4 max-w-xl text-zinc-400">
            {tenant.events.description}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        id="join"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div
          className="rounded-3xl border p-10 md:p-16"
          style={{
            borderColor: `${tenant.theme.accent}30`,
            backgroundColor: `${tenant.theme.accent}08`,
          }}
        >
          <p
            className="text-sm font-medium"
            style={{
              color: tenant.theme.accent,
            }}
          >
            {tenant.cta.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {tenant.cta.title}
          </h2>

          <p className="mt-4 max-w-xl text-zinc-400">
            {tenant.cta.description}
          </p>

          <a
            href={tenant.cta.button.href}
            className="mt-8 inline-block rounded-xl px-6 py-3 font-semibold text-black"
            style={{
              backgroundColor: tenant.theme.accent,
            }}
          >
            {tenant.cta.button.label}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-8 text-sm text-zinc-500">
          <span>{tenant.footer.description}</span>
          <span>{tenant.footer.copyright}</span>
        </div>
      </footer>
    </main>
  );
}