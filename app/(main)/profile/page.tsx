"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Edit3,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Settings,
  ShieldCheck,
  Ticket,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";

const upcomingEvents = [
  {
    title: "AWS Student Community Day Bhilai 2026",
    date: "26 SEP 2026",
    time: "9:00 AM",
    location: "SSTC Auditorium, Bhilai",
    type: "Technology",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    ticket: "General Admission",
  },
  {
    title: "College Cultural Fest 2026",
    date: "04 OCT 2026",
    time: "10:00 AM",
    location: "Bhilai",
    type: "Cultural",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop",
    ticket: "Student Pass",
  },
];

const pastEvents = [
  {
    title: "Developer Meetup — Bhilai",
    date: "18 AUG 2026",
    location: "Innovation Hub",
    type: "Technology",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Campus Startup Meetup",
    date: "02 AUG 2026",
    location: "Raipur",
    type: "Startup",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "events" | "settings"
  >("overview");

  return (
    <main className="min-h-screen bg-[#08080b] text-white">

      {/* -------------------------------------------------------------- */}
      {/* PROFILE HERO                                                   */}
      {/* -------------------------------------------------------------- */}

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-5 pb-8 pt-28 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-xs text-zinc-600">
            <Link href="/" className="hover:text-zinc-300">
              Home
            </Link>

            <ChevronRight className="h-3 w-3" />

            <span className="text-zinc-400">Profile</span>
          </div>

          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">

            {/* Identity */}
            <div className="flex items-center gap-5">

              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-700 text-3xl font-bold shadow-xl shadow-violet-900/20">
                  V
                </div>

                <button
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 shadow-lg transition hover:text-white"
                  aria-label="Change profile picture"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Vedant Uekey
                  </h1>

                  <span className="flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-medium text-violet-300">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                <p className="mt-1 text-sm text-zinc-500">
                  @vedantuekey
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-600">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    vedant@example.com
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    Bhilai, India
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-800">
                <Edit3 className="h-4 w-4" />
                Edit profile
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-9 grid grid-cols-3 divide-x divide-white/5 overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40">
            <ProfileStat
              value="12"
              label="Events attended"
            />

            <ProfileStat
              value="8"
              label="Tickets"
            />

            <ProfileStat
              value="4"
              label="Communities"
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* TABS                                                           */}
      {/* -------------------------------------------------------------- */}

      <div className="sticky top-16 z-30 border-b border-white/5 bg-[#08080b]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl gap-7 overflow-x-auto px-5 lg:px-8">
          <Tab
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Tab>

          <Tab
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
          >
            My events
          </Tab>

          <Tab
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          >
            Account settings
          </Tab>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* CONTENT                                                        */}
      {/* -------------------------------------------------------------- */}

      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">

        {activeTab === "overview" && (
          <Overview />
        )}

        {activeTab === "events" && (
          <Events />
        )}

        {activeTab === "settings" && (
          <SettingsPanel />
        )}
      </div>
    </main>
  );
}

/* ---------------------------------------------------------------------- */
/* OVERVIEW                                                               */
/* ---------------------------------------------------------------------- */

function Overview() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_320px]">

      {/* Main */}
      <div>

        <SectionHeader
          title="Upcoming events"
          description="Events you've registered for."
        />

        <div className="mt-6 space-y-4">
          {upcomingEvents.map((event) => (
            <UpcomingEvent
              key={event.title}
              event={event}
            />
          ))}
        </div>

        <div className="mt-12">
          <SectionHeader
            title="Recently attended"
            description="Your event history."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {pastEvents.map((event) => (
              <PastEvent
                key={event.title}
                event={event}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-5">

        {/* Profile completion */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Profile completion
            </p>

            <span className="text-xs text-violet-400">
              80%
            </span>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-[80%] rounded-full bg-violet-500" />
          </div>

          <p className="mt-3 text-xs leading-5 text-zinc-600">
            Add your college and interests to get better event
            recommendations.
          </p>

          <button className="mt-4 text-xs font-medium text-violet-400 hover:text-violet-300">
            Complete profile →
          </button>
        </div>

        {/* Communities */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                Your communities
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Communities you&apos;re following.
              </p>
            </div>

            <Users className="h-4 w-4 text-zinc-600" />
          </div>

          <div className="mt-5 space-y-3">
            <Community
              letter="A"
              name="AWS User Group Bhilai"
              members="1.8K members"
            />

            <Community
              letter="N"
              name="NSS SSTC"
              members="620 members"
            />

            <Community
              letter="C"
              name="Coding Club"
              members="430 members"
            />
          </div>

          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 py-2.5 text-xs font-medium hover:bg-zinc-800">
            Explore communities
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/3 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>

            <div>
              <p className="text-sm font-medium">
                Account secured
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Your account is protected.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* EVENTS                                                                 */
/* ---------------------------------------------------------------------- */

function Events() {
  return (
    <div>
      <SectionHeader
        title="My events"
        description="Manage your registrations and event tickets."
      />

      <div className="mt-8 flex gap-2 overflow-x-auto">
        {["Upcoming", "Past", "Saved"].map((tab, index) => (
          <button
            key={tab}
            className={`rounded-xl px-4 py-2 text-sm ${
              index === 0
                ? "bg-violet-600 font-medium"
                : "border border-zinc-800 text-zinc-500 hover:bg-zinc-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {upcomingEvents.map((event) => (
          <UpcomingEvent
            key={event.title}
            event={event}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* SETTINGS                                                               */
/* ---------------------------------------------------------------------- */

function SettingsPanel() {
  return (
    <div className="max-w-3xl">
      <SectionHeader
        title="Account settings"
        description="Manage your personal information and account preferences."
      />

      <div className="mt-8 space-y-4">

        <SettingsItem
          icon={<User className="h-4 w-4" />}
          title="Personal information"
          description="Update your name, username, college and location."
        />

        <SettingsItem
          icon={<Mail className="h-4 w-4" />}
          title="Email & phone"
          description="Manage your login and contact information."
        />

        <SettingsItem
          icon={<ShieldCheck className="h-4 w-4" />}
          title="Security"
          description="Change your password and manage account security."
        />

        <SettingsItem
          icon={<Heart className="h-4 w-4" />}
          title="Interests"
          description="Choose topics to personalize your event discovery."
        />

        <button className="mt-6 flex w-full items-center gap-4 rounded-2xl border border-red-500/10 bg-red-500/3 p-5 text-left transition hover:bg-red-500/6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
            <LogOut className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-medium text-red-400">
              Sign out
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Sign out of your Evento account.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* COMPONENTS                                                             */
/* ---------------------------------------------------------------------- */

function UpcomingEvent({
  event,
}: {
  event: (typeof upcomingEvents)[number];
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 transition hover:border-violet-500/20">
      <div className="flex flex-col sm:flex-row">

        <div className="relative h-44 shrink-0 sm:h-auto sm:w-52">
          <Image
            width={1080}
            height={1080}
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-medium text-violet-300">
                {event.type}
              </span>

              <span className="text-xs text-zinc-600">
                Registered
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold">
              {event.title}
            </h3>

            <div className="mt-3 space-y-2 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5" />
                {event.date}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5" />
                {event.time}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-violet-400" />

              <span className="text-xs text-zinc-500">
                {event.ticket}
              </span>
            </div>

            <button className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300">
              View ticket
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PastEvent({
  event,
}: {
  event: (typeof pastEvents)[number];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
      <div className="relative h-36">
        <Image
        width={1080}
        height={1080}
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] backdrop-blur-md">
          {event.type}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold">
          {event.title}
        </h3>

        <div className="mt-3 flex items-center justify-between text-xs text-zinc-600">
          <span>{event.date}</span>
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  );
}

function Community({
  letter,
  name,
  members,
}: {
  letter: string;
  name: string;
  members: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 text-xs font-bold">
        {letter}
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-medium">
          {name}
        </p>

        <p className="mt-0.5 text-[10px] text-zinc-600">
          {members}
        </p>
      </div>
    </div>
  );
}

function ProfileStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="px-4 py-5 text-center">
      <p className="text-xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-zinc-600">
        {label}
      </p>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-1.5 text-sm text-zinc-600">
        {description}
      </p>
    </div>
  );
}

function Tab({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative whitespace-nowrap py-4 text-sm transition ${
        active
          ? "font-medium text-white"
          : "text-zinc-600 hover:text-zinc-300"
      }`}
    >
      {children}

      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-violet-500" />
      )}
    </button>
  );
}

function SettingsItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/40 p-5 text-left transition hover:border-zinc-700 hover:bg-zinc-900">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-zinc-600">
          {description}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-zinc-700" />
    </button>
  );
}