"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type EventStatus = "Published" | "Draft" | "Past";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  registrations: number;
  capacity: number;
  status: EventStatus;
};

const events: Event[] = [
  {
    id: "aws-student-community-day-bhilai-2026",
    title: "AWS Student Community Day Bhilai 2026",
    date: "26 Sep 2026",
    time: "09:00 AM",
    location: "SSTC Auditorium, Bhilai",
    registrations: 486,
    capacity: 500,
    status: "Past",
  },
  {
    id: "cloud-computing-workshop",
    title: "Introduction to Cloud Computing",
    date: "18 Oct 2026",
    time: "02:00 PM",
    location: "Seminar Hall",
    registrations: 128,
    capacity: 200,
    status: "Published",
  },
  {
    id: "aws-community-meetup",
    title: "AWS Community Meetup",
    date: "07 Nov 2026",
    time: "11:00 AM",
    location: "Innovation Lab",
    registrations: 64,
    capacity: 100,
    status: "Published",
  },
  {
    id: "serverless-workshop",
    title: "Build Your First Serverless App",
    date: "22 Nov 2026",
    time: "03:00 PM",
    location: "—",
    registrations: 0,
    capacity: 100,
    status: "Draft",
  },
];

const filters: Array<"All" | EventStatus> = [
  "All",
  "Published",
  "Draft",
  "Past",
];

export default function EventsAdminPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesFilter =
        filter === "All" || event.status === filter;

      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <main className="min-h-screen bg-[#08080b] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#08080b]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:bg-white/[0.07] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>

              <div>
                <h1 className="text-sm font-semibold">
                  Events
                </h1>
                <p className="text-xs text-zinc-500">
                  Manage your community events
                </p>
              </div>
            </div>

            <Link
              href="/admin/events/new"
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-violet-500"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">
                Create event
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Event management
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Your events
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
              Create, manage and track events for your community.
            </p>
          </div>

          <Link
            href="/events"
            className="flex w-fit items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            View public events
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Total events"
            value={events.length}
            icon={<CalendarDays className="h-4 w-4" />}
          />

          <Stat
            label="Published"
            value={events.filter((e) => e.status === "Published").length}
            icon={<ChevronRight className="h-4 w-4" />}
          />

          <Stat
            label="Drafts"
            value={events.filter((e) => e.status === "Draft").length}
            icon={<Clock3 className="h-4 w-4" />}
          />

          <Stat
            label="Registrations"
            value={events.reduce(
              (total, event) => total + event.registrations,
              0
            )}
            icon={<Users className="h-4 w-4" />}
          />
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-1 overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/40 p-1">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition ${
                  filter === item
                    ? "bg-white text-black"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search events..."
              className="w-full rounded-xl border border-white/10 bg-zinc-900/40 py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/40"
            />
          </div>
        </div>

        {/* Events */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30">
          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-[minmax(260px,1fr)_150px_170px_130px_50px] border-b border-white/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
              <span>Event</span>
              <span>Date</span>
              <span>Registrations</span>
              <span>Status</span>
              <span />
            </div>

            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventRow key={event.id} event={event} />
              ))
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-white/10 md:hidden">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <MobileEventCard key={event.id} event={event} />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function EventRow({ event }: { event: Event }) {
  return (
    <Link
      href={`/admin/events/${event.id}`}
      className="grid grid-cols-[minmax(260px,1fr)_150px_170px_130px_50px] items-center border-b border-white/5 px-5 py-5 transition last:border-0 hover:bg-white/[0.025]"
    >
      <div className="min-w-0 pr-5">
        <p className="truncate text-sm font-medium text-zinc-200">
          {event.title}
        </p>

        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-600">
          <span>{event.location}</span>
        </div>
      </div>

      <div>
        <p className="text-sm text-zinc-400">{event.date}</p>
        <p className="mt-1 text-xs text-zinc-600">{event.time}</p>
      </div>

      <div>
        <p className="text-sm text-zinc-400">
          {event.registrations} / {event.capacity}
        </p>

        <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{
              width: `${Math.min(
                (event.registrations / event.capacity) * 100,
                100
              )}%`,
            }}
          />
        </div>
      </div>

      <div>
        <StatusBadge status={event.status} />
      </div>

      <MoreHorizontal className="h-4 w-4 text-zinc-600" />
    </Link>
  );
}

function MobileEventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/admin/events/${event.id}`}
      className="block p-5 transition hover:bg-white/[0.025]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-medium text-zinc-200">
            {event.title}
          </p>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-600">
            <span>{event.date}</span>
            <span>{event.time}</span>
            <span>{event.location}</span>
          </div>
        </div>

        <StatusBadge status={event.status} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Users className="h-3.5 w-3.5" />
          {event.registrations} / {event.capacity} registrations
        </div>

        <ArrowUpRight className="h-4 w-4 text-zinc-600" />
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: EventStatus }) {
  const styles = {
    Published:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    Draft:
      "border-amber-400/20 bg-amber-400/10 text-amber-300",
    Past:
      "border-zinc-400/10 bg-zinc-400/5 text-zinc-500",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">{label}</p>

        <span className="text-zinc-600">
          {icon}
        </span>
      </div>

      <p className="mt-3 text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
        <CalendarDays className="h-5 w-5 text-violet-400" />
      </div>

      <h3 className="mt-4 text-sm font-semibold">
        No events found
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-zinc-600">
        Create your first event or change your search/filter to
        see existing events.
      </p>

      <Link
        href="/admin/events/new"
        className="mt-5 flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold transition hover:bg-violet-500"
      >
        <Plus className="h-3.5 w-3.5" />
        Create event
      </Link>
    </div>
  );
}
