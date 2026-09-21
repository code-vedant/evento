// import { notFound } from "next/navigation";

// type TenantPageProps = {
//   searchParams: Promise<{
//     tenant?: string;
//   }>;
// };

// export default async function TenantPage({
//   searchParams,
// }: TenantPageProps) {
//   const params = await searchParams;

//   const tenantSlug = params.tenant;

//   if (!tenantSlug) {
//     notFound();
//   }

//   // Later:
//   // const club = await getClubBySlug(tenantSlug);

//   return (
//     <main className="min-h-screen bg-[#08080b] text-white">
//       <h1 className="text-4xl font-bold">
//         {tenantSlug} Evento
//       </h1>

//       <p className="mt-3 text-zinc-400">
//         Tenant: {tenantSlug}
//       </p>
//     </main>
//   );
// }

import tenants from "../data/tenants.json";
import { notFound } from "next/navigation";

type Tenant = (typeof tenants)[number];

type TenantPageProps = {
  searchParams: Promise<{
    slug?: string;
  }>;
};

export default async function TenantPage({
  searchParams,
}: TenantPageProps) {
  const params = await searchParams;

  const tenant = tenants.find(
    (item) => item.slug === params.slug
  ) as Tenant | undefined;

  if (!tenant) {
    notFound();
  }

  return (
    <main
      className="min-h-screen bg-[#08080b] text-white"
      style={{
        "--tenant-accent": tenant.accent,
      } as React.CSSProperties}
    >
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-black"
              style={{
                backgroundColor: tenant.accent,
              }}
            >
              {tenant.shortName.slice(0, 2)}
            </div>

            <div>
              <p className="font-semibold">
                {tenant.name}
              </p>

              <p className="text-xs text-zinc-500">
                Powered by Evento
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a
              href="#events"
              className="transition hover:text-white"
            >
              Events
            </a>

            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>

            <a
              href="#community"
              className="transition hover:text-white"
            >
              Community
            </a>

            <button
              className="rounded-xl px-4 py-2 font-medium text-black"
              style={{
                backgroundColor: tenant.accent,
              }}
            >
              Join Community
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-20 blur-[140px]"
          style={{
            backgroundColor: tenant.accent,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-32">
          <div className="max-w-3xl">
            <div
              className="mb-6 inline-flex rounded-full border px-4 py-2 text-sm"
              style={{
                borderColor: `${tenant.accent}40`,
                color: tenant.accent,
                backgroundColor: `${tenant.accent}10`,
              }}
            >
              {tenant.category}
            </div>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              {tenant.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {tenant.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                className="rounded-xl px-6 py-3 font-semibold text-black"
                style={{
                  backgroundColor: tenant.accent,
                }}
              >
                Explore Events
              </button>

              <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-3">
          {Object.entries(tenant.stats).map(
            ([label, value]) => (
              <div
                key={label}
                className="border-r border-white/10 px-6 py-10 text-center"
              >
                <p
                  className="text-4xl font-bold"
                  style={{
                    color: tenant.accent,
                  }}
                >
                  {value}
                </p>

                <p className="mt-2 text-sm capitalize text-zinc-500">
                  {label}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="max-w-2xl">
          <p
            className="mb-3 text-sm font-medium"
            style={{
              color: tenant.accent,
            }}
          >
            ABOUT THE COMMUNITY
          </p>

          <h2 className="text-4xl font-bold">
            More than a club.
            <br />
            It's a community.
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            {tenant.description}
          </p>

          <p className="mt-4 text-sm text-zinc-500">
            {tenant.location}
          </p>
        </div>
      </section>

      {/* Events placeholder */}
      <section
        id="events"
        className="border-t border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p
            className="text-sm font-medium"
            style={{
              color: tenant.accent,
            }}
          >
            UPCOMING
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Upcoming Events
          </h2>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-zinc-500">
              Events will appear here.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {tenant.name}
          </p>

          <p>
            Powered by{" "}
            <span className="text-white">
              Evento
            </span>
          </p>
        </div>
      </footer>
    </main>
  );
}