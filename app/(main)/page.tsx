// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center font-sans text-white bg-black dark:bg-black">
//       <section className="flex flex-col items-center justify-center w-full h-screen text-center">
//         <Image
//           src={"/images/landing/bg-landing.png"}
//           alt="Landing Background"
//           width={1972}
//           height={1315}
//           className="w-full h-full object-cover absolute top-0 left-0"
//         />
//         <div className="flex items-center justify-center gap-3 text-7xl font-bold z-10">
//           <h1 className="shadow-black">Discover.</h1>
//           <h1 className="">Create.</h1>
//           <h1 className="">Celebrate.</h1>
//         </div>
//         <div className="max-w-screen h-fit px-40 mt-10 flex items-center justify-center text-xl font-semibold z-10">
//           <p>
//             This campus is full of exciting events, amazing clubs, and
//             unforgettable experiences. Find what`&apos;`s happening, join your favorite
//             communities, and create events that bring everyone together.
//           </p>
//         </div>
//         <div className="max-w-screen h-fit px-40 mt-10 flex items-center justify-center text-xl font-semibold z-10">
//           <button className="border-4 rounded-full p-5">Explore Events</button>
//         </div>
//       </section>

//       <section className="flex flex-col items-center justify-center w-full h-screen text-center">
//         <h2>What we Do</h2>
//       </section>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  MapPin,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  X,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const upcomingEvents = [
  {
    title: "AWS Student Community Day Bhilai 2026",
    category: "Technology",
    date: "26 SEP",
    location: "SSTC Auditorium",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    color: "from-orange-500/80 to-violet-700/80",
  },
  {
    title: "College Cultural Fest 2026",
    category: "Cultural",
    date: "04 OCT",
    location: "Bhilai",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop",
    color: "from-pink-500/70 to-purple-700/80",
  },
  {
    title: "HackVerse 2026",
    category: "Hackathon",
    date: "12 OCT",
    location: "Innovation Hub",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    color: "from-cyan-500/70 to-blue-700/80",
  },
  {
    title: "Campus Startup Meetup",
    category: "Startup",
    date: "18 OCT",
    location: "Raipur",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
    color: "from-emerald-500/70 to-teal-700/80",
  },
];

const faqs = [
  {
    question: "What is Evento?",
    answer:
      "Evento is an event management and discovery platform built for students, communities, clubs, organizations, and event organizers. You can discover events, register for them, manage tickets, and build dedicated spaces for your community.",
  },
  {
    question: "Can colleges and clubs have their own page?",
    answer:
      "Yes. Evento supports multi-tenant club and organization spaces. A club can have its own branded event page, members, events, registrations, and management tools.",
  },
  {
    question: "Can I create an event for free?",
    answer:
      "Yes. You can start with the free plan and create events with the essential tools needed to manage registrations and attendees.",
  },
  {
    question: "How does ticket verification work?",
    answer:
      "Each registered attendee can receive a unique ticket. Organizers can verify tickets using the attendee's QR code at the event entrance.",
  },
  {
    question: "Can I customize my club's Evento page?",
    answer:
      "Yes. Organization plans can customize their community space with branding, colors, event layouts, information, and other organization-specific content.",
  },
  {
    question: "Is Evento only for college events?",
    answer:
      "No. Evento is designed for communities and organizations of different types, including colleges, clubs, student communities, workshops, meetups, conferences, and cultural events.",
  },
];

const services = [
  {
    icon: CalendarDays,
    title: "Event Management",
    description:
      "Create, publish and manage events from one centralized dashboard.",
  },
  {
    icon: Ticket,
    title: "Smart Ticketing",
    description:
      "Handle registrations, tickets and QR-based entry verification.",
  },
  {
    icon: Users,
    title: "Community Management",
    description:
      "Build a dedicated digital space for your club or organization.",
  },
  {
    icon: Globe2,
    title: "Multi-Tenant Spaces",
    description:
      "Give every organization its own branded space and event ecosystem.",
  },
];

const pricing = [
  {
    name: "Free",
    price: "₹0",
    description: "For individuals and small events.",
    features: [
      "Create events",
      "Basic registration",
      "Attendee management",
      "QR ticket verification",
    ],
  },
  {
    name: "Community",
    price: "₹499",
    description: "For clubs and growing communities.",
    popular: true,
    features: [
      "Everything in Free",
      "Custom club page",
      "Multiple organizers",
      "Advanced event management",
      "Community branding",
    ],
  },
  {
    name: "Organization",
    price: "Custom",
    description: "For institutions and large communities.",
    features: [
      "Everything in Community",
      "Advanced multi-tenant setup",
      "Custom domain",
      "Priority support",
      "Organization analytics",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#08080b] text-white">

      {/* ------------------------------------------------------------------ */}
      {/* NAVBAR                                                             */}
      {/* ------------------------------------------------------------------ */}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#08080b]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
              <Ticket className="h-4 w-4" />
            </div>

            <span className="text-lg font-bold tracking-tight">
              evento
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <a href="#events" className="text-sm text-zinc-400 hover:text-white">
              Events
            </a>
            <a href="#clubs" className="text-sm text-zinc-400 hover:text-white">
              For Clubs
            </a>
            <a href="#services" className="text-sm text-zinc-400 hover:text-white">
              Services
            </a>
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="text-sm text-zinc-400 hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-sm text-zinc-300 hover:text-white"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Get started
            </Link>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 text-zinc-400 md:hidden"
          >
            {mobileMenu ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-white/5 bg-[#08080b] p-5 md:hidden">
            <div className="flex flex-col gap-4">
              {["events", "clubs", "services", "pricing", "faq"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setMobileMenu(false)}
                    className="text-sm capitalize text-zinc-400"
                  >
                    {item}
                  </a>
                )
              )}

              <div className="mt-2 flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 rounded-xl border border-zinc-800 py-3 text-center text-sm"
                >
                  Sign in
                </Link>

                <Link
                  href="/register"
                  className="flex-1 rounded-xl bg-white py-3 text-center text-sm font-semibold text-black"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* HERO — CURRENT MAIN EVENT                                          */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative min-h-screen pt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=90&w=2200&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-transparent to-black/20" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-end px-5 pb-16 pt-24 lg:px-8 lg:pb-24">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Happening now
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">
              AWS User Group Bhilai
            </p>

            <h1 className="text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">
              AWS Student
              <br />
              Community Day
              <br />
              <span className="text-violet-400">Bhilai 2026</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
              Builders of Tomorrow. A community-driven technology
              experience bringing students, developers and cloud
              enthusiasts together.
            </p>

            <div className="mt-7 flex flex-wrap gap-4 text-sm text-zinc-300">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-violet-400" />
                26 September 2026
              </span>

              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-violet-400" />
                SSTC Auditorium, Bhilai
              </span>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/events/aws-student-community-day-bhilai-2026"
                className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                View event
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/events"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium backdrop-blur-md transition hover:bg-white/10"
              >
                Explore events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* UPCOMING EVENTS                                                    */}
      {/* ------------------------------------------------------------------ */}

      <section id="events" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <SectionHeading
            eyebrow="Discover"
            title="What's happening next."
            description="Find events worth showing up for."
          />

          <div className="mt-12 flex gap-5 overflow-x-auto pb-5 [scrollbar-width:none]">
            {upcomingEvents.map((event) => (
              <article
                key={event.title}
                className="group min-w-[300px] max-w-[340px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 sm:min-w-[340px]"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${event.color}`}
                  />

                  <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md">
                    <p className="text-xs font-bold">{event.date}</p>
                  </div>

                  <div className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs backdrop-blur-md">
                    {event.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-2 text-lg font-semibold">
                    {event.title}
                  </h3>

                  <div className="mt-4 flex flex-col gap-2 text-xs text-zinc-500">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock3 className="h-3.5 w-3.5" />
                      Upcoming event
                    </span>
                  </div>

                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 py-2.5 text-sm font-medium transition hover:bg-zinc-800">
                    View details
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SEARCH STRIP                                                       */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-y border-white/5 bg-zinc-950 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 sm:flex-row lg:px-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

            <input
              placeholder="Search events, clubs, communities..."
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-11 pr-4 text-sm outline-none placeholder:text-zinc-600 focus:border-violet-500"
            />
          </div>

          <button className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500">
            Find events
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MULTI TENANT CLUB PROMOTION                                        */}
      {/* ------------------------------------------------------------------ */}

      <section id="clubs" className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs font-medium text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              Built for communities
            </div>

            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Your club.
              <br />
              <span className="text-violet-400">
                Your own space.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
              Turn your club into a complete digital community.
              Create events, manage members, publish announcements
              and give your audience a dedicated branded experience.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Dedicated club page",
                "Custom branding and identity",
                "Multiple event organizers",
                "Member and registration management",
                "Club-specific event discovery",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-zinc-300"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-violet-400">
                    <Check className="h-3.5 w-3.5" />
                  </div>

                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/register?type=club"
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              Create your club
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Browser mockup */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-violet-600/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">

              <div className="flex h-11 items-center gap-1.5 border-b border-white/5 bg-zinc-950 px-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />

                <div className="ml-4 flex-1 rounded-md bg-zinc-900 px-3 py-1 text-[10px] text-zinc-600">
                  aws.evento.com
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-xs font-bold">
                      A
                    </div>

                    <div>
                      <p className="text-xs font-semibold">
                        AWS Student Community
                      </p>
                      <p className="text-[10px] text-zinc-600">
                        Bhilai
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-orange-500/10 px-3 py-1.5 text-[10px] text-orange-300">
                    Follow
                  </div>
                </div>

                <div className="mt-6 h-36 overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/40 to-violet-700/50">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-widest text-orange-200">
                        Featured event
                      </p>

                      <p className="mt-2 text-xl font-bold">
                        Builders of Tomorrow
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <MiniStat value="24" label="Events" />
                  <MiniStat value="1.8K" label="Members" />
                  <MiniStat value="4.9K" label="Attendees" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SERVICES                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section id="services" className="border-y border-white/5 bg-zinc-950 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <SectionHeading
            eyebrow="Everything in one place"
            title="Tools that make events easier."
            description="From the first idea to the final attendee, Evento brings your entire event workflow together."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition hover:-translate-y-1 hover:border-violet-500/30"
                >
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-semibold">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {service.description}
                  </p>

                  <ArrowUpRight className="mt-7 h-4 w-4 text-zinc-700 transition group-hover:text-violet-400" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PRICING                                                            */}
      {/* ------------------------------------------------------------------ */}

      <section id="pricing" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <SectionHeading
            eyebrow="Simple pricing"
            title="Start free. Scale when you need."
            description="Choose the tools that match your community or organization."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-7 ${
                  plan.popular
                    ? "border-violet-500/40 bg-violet-500/[0.05]"
                    : "border-white/10 bg-zinc-900/40"
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-5 top-5 rounded-full bg-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                    Popular
                  </div>
                )}

                <p className="text-sm font-medium text-zinc-400">
                  {plan.name}
                </p>

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-4xl font-semibold">
                    {plan.price}
                  </span>

                  {plan.price !== "Custom" && (
                    <span className="pb-1 text-sm text-zinc-600">
                      /month
                    </span>
                  )}
                </div>

                <p className="mt-3 min-h-10 text-sm leading-5 text-zinc-500">
                  {plan.description}
                </p>

                <Link
                  href="/register"
                  className={`mt-7 block rounded-xl py-3 text-center text-sm font-semibold ${
                    plan.popular
                      ? "bg-violet-600 hover:bg-violet-500"
                      : "border border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                  }`}
                >
                  {plan.name === "Organization"
                    ? "Contact us"
                    : "Get started"}
                </Link>

                <div className="my-7 h-px bg-white/5" />

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-sm text-zinc-400"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                */}
      {/* ------------------------------------------------------------------ */}

      <section className="px-5 pb-24 lg:px-8 lg:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-violet-500/20 bg-violet-600 px-7 py-14 text-center sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_45%)]" />

          <div className="relative">
            <Zap className="mx-auto h-8 w-8 text-violet-200" />

            <h2 className="mt-5 text-3xl font-semibold sm:text-5xl">
              Your next event starts here.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-violet-100">
              Create an event, discover your next experience, or
              build a digital home for your community.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black hover:bg-zinc-100"
              >
                Get started
              </Link>

              <Link
                href="/events"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                Explore events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ                                                                */}
      {/* ------------------------------------------------------------------ */}

      <section id="faq" className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">

          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions."
            description="Everything you need to know before getting started."
          />

          <div className="mt-12 divide-y divide-white/5 border-y border-white/5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  >
                    <span className="text-sm font-medium text-zinc-200 sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-zinc-500 transition ${
                        isOpen ? "rotate-180 text-violet-400" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-6 pr-8 text-sm leading-7 text-zinc-500">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <footer className="border-t border-white/5 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Ticket className="h-4 w-4" />
            </div>

            <span className="font-bold">evento</span>
          </Link>

          <div className="flex flex-wrap gap-5 text-xs text-zinc-600">
            <Link href="/events" className="hover:text-zinc-300">
              Events
            </Link>
            <Link href="/clubs" className="hover:text-zinc-300">
              Clubs
            </Link>
            <Link href="/pricing" className="hover:text-zinc-300">
              Pricing
            </Link>
            <Link href="/terms" className="hover:text-zinc-300">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-zinc-300">
              Privacy
            </Link>
          </div>

          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} Evento
          </p>
        </div>
      </footer>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-sm leading-7 text-zinc-500 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function MiniStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-zinc-950 p-3 text-center">
      <p className="text-sm font-semibold">{value}</p>
      <p className="mt-1 text-[9px] text-zinc-600">{label}</p>
    </div>
  );
}
