"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Eye,
  Globe2,
  LayoutTemplate,
  Palette,
  Save,
  Sparkles,
  Upload,
  Users,
  CalendarDays,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

type TemplateId = "aurora" | "minimal" | "community";

type ClubData = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  location: string;
  members: string;
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  instagram: string;
  website: string;
};

const templates = [
  {
    id: "aurora" as TemplateId,
    name: "Aurora",
    description: "Bold, modern and event-focused",
    icon: Sparkles,
    previewClass: "from-violet-600 via-fuchsia-500 to-indigo-600",
  },
  {
    id: "minimal" as TemplateId,
    name: "Minimal",
    description: "Clean, elegant and professional",
    icon: LayoutTemplate,
    previewClass: "from-zinc-700 via-zinc-500 to-zinc-800",
  },
  {
    id: "community" as TemplateId,
    name: "Community",
    description: "Social, energetic and member-focused",
    icon: Users,
    previewClass: "from-indigo-500 via-blue-500 to-cyan-500",
  },
];

export default function ClubLandingBuilderPage() {
  const [template, setTemplate] = useState<TemplateId>("aurora");
  const [activeTab, setActiveTab] = useState<"content" | "theme">("content");
  const [published, setPublished] = useState(false);

  const [club, setClub] = useState<ClubData>({
    name: "AWS User Group Bhilai",
    slug: "aws",
    tagline: "Learn. Build. Connect.",
    description:
      "A community of builders, developers and technology enthusiasts coming together to learn, build and grow.",
    location: "Bhilai, Chhattisgarh",
    members: "500+",
    heroTitle: "Build the future together.",
    heroDescription:
      "Join our community of passionate builders, attend events, learn from industry experts and create something meaningful.",
    primaryCta: "Join Community",
    secondaryCta: "Explore Events",
    instagram: "https://instagram.com/",
    website: "https://example.com",
  });

  const [accent, setAccent] = useState("#8B5CF6");

  const update = (key: keyof ClubData, value: string) => {
    setClub((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const selectedTemplate = useMemo(
    () => templates.find((item) => item.id === template)!,
    [template]
  );

  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090c]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/clubs"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:bg-white/[0.07] hover:text-white"
            >
              <ArrowLeft size={17} />
            </Link>

            <div className="h-6 w-px bg-white/10" />

            <div>
              <p className="text-sm font-semibold">Club Landing Page</p>
              <p className="text-xs text-zinc-500">
                {club.name}
              </p>
            </div>

            <div className="ml-2 hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Approved
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.07] sm:flex">
              <Eye size={16} />
              Preview
            </button>

            <button
              onClick={() => setPublished(true)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110"
              style={{ backgroundColor: accent }}
            >
              <Globe2 size={16} />
              Publish
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px]">
        <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[390px_1fr]">
          {/* LEFT EDITOR */}
          <aside className="border-r border-white/10 bg-[#0a0a0e]">
            <div className="border-b border-white/10 p-5">
              <div className="mb-5">
                <h1 className="text-lg font-semibold">
                  Build your club page
                </h1>
                <p className="mt-1 text-sm leading-5 text-zinc-500">
                  Choose a template and customize your public community page.
                </p>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 rounded-lg border border-white/10 bg-white/[0.02] p-1">
                <button
                  onClick={() => setActiveTab("content")}
                  className={`rounded-md py-2 text-sm transition ${
                    activeTab === "content"
                      ? "bg-white/10 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Content
                </button>

                <button
                  onClick={() => setActiveTab("theme")}
                  className={`rounded-md py-2 text-sm transition ${
                    activeTab === "theme"
                      ? "bg-white/10 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Theme
                </button>
              </div>
            </div>

            {activeTab === "content" ? (
              <div className="space-y-7 overflow-y-auto p-5">
                {/* Templates */}
                <section>
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Template</p>
                      <p className="text-xs text-zinc-500">
                        Choose your page layout
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {templates.map((item) => {
                      const Icon = item.icon;
                      const selected = template === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => setTemplate(item.id)}
                          className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                            selected
                              ? "border-violet-500/50 bg-violet-500/[0.08]"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div
                            className={`flex h-12 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${item.previewClass}`}
                          >
                            <Icon size={19} className="text-white" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">
                              {item.name}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-zinc-500">
                              {item.description}
                            </p>
                          </div>

                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              selected
                                ? "border-violet-500 bg-violet-500"
                                : "border-white/20"
                            }`}
                          >
                            {selected && <Check size={12} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Club Identity */}
                <section>
                  <SectionTitle
                    title="Club identity"
                    description="Basic information about your community"
                  />

                  <div className="mt-4 space-y-4">
                    <Field
                      label="Club name"
                      value={club.name}
                      onChange={(value) => update("name", value)}
                    />

                    <Field
                      label="URL"
                      prefix="evento.com/"
                      value={club.slug}
                      onChange={(value) => update("slug", value)}
                    />

                    <Field
                      label="Tagline"
                      value={club.tagline}
                      onChange={(value) => update("tagline", value)}
                    />

                    <TextArea
                      label="Description"
                      value={club.description}
                      onChange={(value) => update("description", value)}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="Location"
                        value={club.location}
                        onChange={(value) => update("location", value)}
                      />

                      <Field
                        label="Members"
                        value={club.members}
                        onChange={(value) => update("members", value)}
                      />
                    </div>
                  </div>
                </section>

                {/* Hero */}
                <section>
                  <SectionTitle
                    title="Hero section"
                    description="The first thing visitors see"
                  />

                  <div className="mt-4 space-y-4">
                    <TextArea
                      label="Hero heading"
                      value={club.heroTitle}
                      onChange={(value) => update("heroTitle", value)}
                    />

                    <TextArea
                      label="Hero description"
                      value={club.heroDescription}
                      onChange={(value) =>
                        update("heroDescription", value)
                      }
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="Primary button"
                        value={club.primaryCta}
                        onChange={(value) => update("primaryCta", value)}
                      />

                      <Field
                        label="Secondary button"
                        value={club.secondaryCta}
                        onChange={(value) =>
                          update("secondaryCta", value)
                        }
                      />
                    </div>
                  </div>
                </section>

                {/* Links */}
                <section>
                  <SectionTitle
                    title="Social links"
                    description="Connect your existing platforms"
                  />

                  <div className="mt-4 space-y-4">
                    <Field
                      label="Instagram"
                      value={club.instagram}
                      onChange={(value) => update("instagram", value)}
                    />

                    <Field
                      label="Website"
                      value={club.website}
                      onChange={(value) => update("website", value)}
                    />
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-7 p-5">
                <section>
                  <SectionTitle
                    title="Accent color"
                    description="Choose the primary color for your page"
                  />

                  <div className="mt-4 grid grid-cols-5 gap-3">
                    {[
                      "#8B5CF6",
                      "#3B82F6",
                      "#06B6D4",
                      "#10B981",
                      "#F97316",
                      "#EC4899",
                      "#EF4444",
                      "#EAB308",
                      "#FFFFFF",
                      "#A855F7",
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => setAccent(color)}
                        className="relative h-10 rounded-lg border border-white/10"
                        style={{ backgroundColor: color }}
                      >
                        {accent === color && (
                          <Check
                            size={16}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={accent}
                      onChange={(e) => setAccent(e.target.value)}
                      className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-violet-500/50"
                    />

                    <div
                      className="h-9 w-9 rounded-lg border border-white/10"
                      style={{ backgroundColor: accent }}
                    />
                  </div>
                </section>

                <section>
                  <SectionTitle
                    title="Club logo"
                    description="Upload your community logo"
                  />

                  <button className="mt-4 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-8 text-center transition hover:border-white/30 hover:bg-white/[0.04]">
                    <Upload
                      size={22}
                      className="mb-3 text-zinc-500"
                    />
                    <p className="text-sm font-medium">
                      Upload logo
                    </p>
                    <p className="mt-1 text-xs text-zinc-600">
                      PNG, JPG or SVG · Max 5MB
                    </p>
                  </button>
                </section>

                <section>
                  <SectionTitle
                    title="Page sections"
                    description="Sections included in this template"
                  />

                  <div className="mt-4 space-y-2">
                    {[
                      "Hero",
                      "About the club",
                      "Upcoming events",
                      "Community statistics",
                      "Featured members",
                      "Call to action",
                    ].map((section) => (
                      <div
                        key={section}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5"
                      >
                        <span className="text-sm text-zinc-300">
                          {section}
                        </span>

                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                          <Check size={12} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Bottom Save */}
            <div className="sticky bottom-0 border-t border-white/10 bg-[#0a0a0e]/95 p-4 backdrop-blur-xl">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] py-2.5 text-sm font-medium transition hover:bg-white/[0.08]">
                <Save size={16} />
                Save changes
              </button>
            </div>
          </aside>

          {/* PREVIEW */}
          <section className="relative overflow-hidden bg-[#111116]">
            {/* Preview toolbar */}
            <div className="flex h-14 items-center justify-between border-b border-white/10 bg-[#0d0d11] px-5">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Eye size={16} />
                Live preview
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-zinc-600 sm:block">
                  {selectedTemplate.name} template
                </span>

                <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
                  <button className="rounded px-2 py-1 text-xs text-white bg-white/10">
                    Desktop
                  </button>
                  <button className="rounded px-2 py-1 text-xs text-zinc-500">
                    Mobile
                  </button>
                </div>
              </div>
            </div>

            {/* Website preview */}
            <div className="h-[calc(100vh-118px)] overflow-y-auto p-4 sm:p-8">
              <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#08080b] shadow-2xl">
                {template === "aurora" && (
                  <AuroraPreview club={club} accent={accent} />
                )}

                {template === "minimal" && (
                  <MinimalPreview club={club} accent={accent} />
                )}

                {template === "community" && (
                  <CommunityPreview club={club} accent={accent} />
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {published && (
        <div className="fixed bottom-6 right-6 z-[100] w-[360px] rounded-2xl border border-emerald-500/20 bg-[#101015] p-4 shadow-2xl shadow-black/50">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Check size={18} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold">
                Landing page published
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Your club page is now available at:
              </p>

              <p className="mt-2 flex items-center gap-1 text-xs font-medium text-violet-400">
                {club.slug}.evento.com
                <ExternalLink size={12} />
              </p>
            </div>

            <button
              onClick={() => setPublished(false)}
              className="text-zinc-600 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-xs text-zinc-500">{description}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-zinc-400">
        {label}
      </span>

      <div className="flex rounded-lg border border-white/10 bg-white/[0.03] transition focus-within:border-violet-500/50">
        {prefix && (
          <span className="flex items-center border-r border-white/10 px-3 text-xs text-zinc-600">
            {prefix}
          </span>
        )}

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-700"
        />
      </div>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-zinc-400">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500/50"
      />
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* TEMPLATE 1 — AURORA                                                        */
/* -------------------------------------------------------------------------- */

function AuroraPreview({
  club,
  accent,
}: {
  club: ClubData;
  accent: string;
}) {
  return (
    <div className="min-h-[900px] bg-[#08080b]">
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold"
            style={{ backgroundColor: accent }}
          >
            {club.name.charAt(0)}
          </div>

          <span className="text-sm font-semibold">
            {club.name}
          </span>
        </div>

        <div className="hidden items-center gap-6 text-xs text-zinc-500 sm:flex">
          <span>Events</span>
          <span>Community</span>
          <span>About</span>

          <button
            className="rounded-lg px-4 py-2 text-white"
            style={{ backgroundColor: accent }}
          >
            {club.primaryCta}
          </button>
        </div>
      </nav>

      <section className="relative flex min-h-[540px] items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ backgroundColor: accent }}
        />

        <div className="relative z-10 max-w-3xl">
          <div
            className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs"
            style={{
              borderColor: `${accent}40`,
              backgroundColor: `${accent}10`,
              color: accent,
            }}
          >
            <Sparkles size={13} />
            {club.tagline}
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            {club.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            {club.heroDescription}
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <button
              className="rounded-xl px-5 py-3 text-sm font-semibold"
              style={{ backgroundColor: accent }}
            >
              {club.primaryCta}
            </button>

            <button className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm">
              {club.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      <Stats club={club} accent={accent} />

      <PreviewEvents accent={accent} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TEMPLATE 2 — MINIMAL                                                       */
/* -------------------------------------------------------------------------- */

function MinimalPreview({
  club,
  accent,
}: {
  club: ClubData;
  accent: string;
}) {
  return (
    <div className="min-h-[900px] bg-[#f5f5f3] text-zinc-900">
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-sm font-bold">{club.name}</div>

        <div className="hidden gap-6 text-xs text-zinc-500 sm:flex">
          <span>Events</span>
          <span>About</span>
          <span>Community</span>
        </div>

        <button
          className="rounded-full px-4 py-2 text-xs font-semibold text-white"
          style={{ backgroundColor: accent }}
        >
          {club.primaryCta}
        </button>
      </nav>

      <section className="px-8 py-24 sm:px-16 sm:py-32">
        <div className="max-w-4xl">
          <p
            className="mb-6 text-sm font-medium"
            style={{ color: accent }}
          >
            {club.tagline}
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            {club.heroTitle}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-500">
            {club.heroDescription}
          </p>

          <div className="mt-9 flex gap-3">
            <button
              className="rounded-full px-6 py-3 text-sm font-medium text-white"
              style={{ backgroundColor: accent }}
            >
              {club.primaryCta}
            </button>

            <button className="rounded-full border border-zinc-300 px-6 py-3 text-sm">
              {club.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      <div className="border-y border-zinc-200 px-8 py-10 sm:px-16">
        <div className="grid gap-8 sm:grid-cols-3">
          <MinimalStat value={club.members} label="Community members" />
          <MinimalStat value="24+" label="Events hosted" />
          <MinimalStat value="12" label="Active organizers" />
        </div>
      </div>

      <section className="px-8 py-20 sm:px-16">
        <p className="text-xs uppercase tracking-widest text-zinc-400">
          Upcoming
        </p>

        <h2 className="mt-3 text-3xl font-semibold">
          Events worth showing up for.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {["Community Meetup", "Tech Workshop", "Annual Conference"].map(
            (event, i) => (
              <div
                key={event}
                className="rounded-2xl border border-zinc-200 bg-white p-5"
              >
                <div
                  className="mb-8 h-24 rounded-xl"
                  style={{
                    backgroundColor: `${accent}${i === 0 ? "20" : "12"}`,
                  }}
                />

                <p className="text-sm font-medium">{event}</p>

                <p className="mt-2 text-xs text-zinc-400">
                  View event details →
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TEMPLATE 3 — COMMUNITY                                                     */
/* -------------------------------------------------------------------------- */

function CommunityPreview({
  club,
  accent,
}: {
  club: ClubData;
  accent: string;
}) {
  return (
    <div className="min-h-[900px] bg-[#090d18]">
      <section
        className="relative overflow-hidden px-6 py-16 sm:px-12"
        style={{
          background: `linear-gradient(135deg, ${accent}30, transparent 60%)`,
        }}
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full font-bold"
              style={{ backgroundColor: accent }}
            >
              {club.name.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-semibold">{club.name}</p>
              <p className="text-xs text-zinc-500">
                {club.members} members
              </p>
            </div>
          </div>

          <button className="rounded-full border border-white/10 px-4 py-2 text-xs">
            {club.secondaryCta}
          </button>
        </nav>

        <div className="grid items-center gap-12 py-24 lg:grid-cols-2">
          <div>
            <div
              className="mb-6 flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs"
              style={{
                backgroundColor: `${accent}18`,
                color: accent,
              }}
            >
              <Users size={13} />
              {club.members} people building together
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              {club.heroTitle}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400">
              {club.heroDescription}
            </p>

            <button
              className="mt-8 rounded-xl px-6 py-3 text-sm font-semibold"
              style={{ backgroundColor: accent }}
            >
              {club.primaryCta}
            </button>
          </div>

          <div className="relative hidden h-[340px] lg:block">
            <div
              className="absolute right-10 top-8 h-64 w-64 rounded-3xl rotate-6 opacity-40"
              style={{ backgroundColor: accent }}
            />

            <div className="absolute right-0 top-0 h-64 w-64 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
              <div className="flex h-full flex-col justify-between">
                <Sparkles
                  size={28}
                  style={{ color: accent }}
                />

                <div>
                  <p className="text-lg font-semibold">
                    Community
                  </p>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">
                    Connect with people who are learning, building and
                    creating together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats club={club} accent={accent} />

      <section className="px-6 py-16 sm:px-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-600">
              Don't miss out
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Upcoming events
            </h2>
          </div>

          <span
            className="hidden text-xs sm:block"
            style={{ color: accent }}
          >
            View all events →
          </span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "AWS Community Meetup",
            "Developer Workshop",
            "Builders Night",
          ].map((event, i) => (
            <div
              key={event}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-1 hover:bg-white/[0.05]"
            >
              <div
                className="flex h-36 items-end rounded-xl p-4"
                style={{
                  background: `linear-gradient(135deg, ${accent}${
                    i === 0 ? "55" : "20"
                  }, transparent)`,
                }}
              >
                <span className="rounded-full bg-black/30 px-3 py-1 text-xs backdrop-blur">
                  Upcoming
                </span>
              </div>

              <div className="px-1 pb-1 pt-4">
                <p className="text-sm font-medium">{event}</p>

                <div className="mt-3 flex items-center gap-3 text-xs text-zinc-600">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    26 Sept
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    Bhilai
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SHARED PREVIEW COMPONENTS                                                   */
/* -------------------------------------------------------------------------- */

function Stats({
  club,
  accent,
}: {
  club: ClubData;
  accent: string;
}) {
  return (
    <section className="border-y border-white/10 px-6 py-8">
      <div className="grid grid-cols-3 gap-4">
        {[
          [club.members, "Members"],
          ["24+", "Events"],
          ["12", "Organizers"],
        ].map(([value, label]) => (
          <div key={label} className="text-center">
            <p
              className="text-2xl font-bold"
              style={{ color: accent }}
            >
              {value}
            </p>
            <p className="mt-1 text-xs text-zinc-600">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MinimalStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-zinc-400">{label}</p>
    </div>
  );
}

function PreviewEvents({ accent }: { accent: string }) {
  return (
    <section className="px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-600">
            What's happening
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            Upcoming events
          </h2>
        </div>

        <ChevronRight
          size={18}
          style={{ color: accent }}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {["Community Meetup", "Tech Workshop", "Hack Night"].map(
          (event, i) => (
            <div
              key={event}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div
                className="h-28 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${accent}${
                    i === 0 ? "45" : "18"
                  }, transparent)`,
                }}
              />

              <p className="mt-4 text-sm font-medium">{event}</p>

              <p className="mt-2 text-xs text-zinc-600">
                26 Sept · Bhilai
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}