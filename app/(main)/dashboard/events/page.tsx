"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Download,
  Eye,
  Filter,
  LayoutDashboard,
  MoreHorizontal,
  PieChart,
  Ticket,
  TrendingUp,
  Users,
  UserCheck,
  UserPlus,
  Wallet,
} from "lucide-react";

type Period = "7d" | "30d" | "90d" | "1y";

const stats = [
  {
    title: "Total registrations",
    value: "8,492",
    change: "+18.4%",
    positive: true,
    icon: UserPlus,
    description: "vs previous period",
  },
  {
    title: "Total attendees",
    value: "6,847",
    change: "+12.8%",
    positive: true,
    icon: UserCheck,
    description: "vs previous period",
  },
  {
    title: "Event revenue",
    value: "₹2,84,650",
    change: "+24.6%",
    positive: true,
    icon: CircleDollarSign,
    description: "vs previous period",
  },
  {
    title: "Page views",
    value: "34.8K",
    change: "-3.2%",
    positive: false,
    icon: Eye,
    description: "vs previous period",
  },
];

const events = [
  {
    name: "AWS Student Community Day Bhilai",
    date: "26 Sep 2026",
    registrations: 1248,
    capacity: 1500,
    attendance: 1086,
    revenue: "₹48,200",
    status: "Upcoming",
  },
  {
    name: "Builders of Tomorrow Meetup",
    date: "12 Sep 2026",
    registrations: 842,
    capacity: 1000,
    attendance: 731,
    revenue: "₹24,800",
    status: "Completed",
  },
  {
    name: "Cloud & AI Workshop",
    date: "30 Aug 2026",
    registrations: 516,
    capacity: 600,
    attendance: 472,
    revenue: "₹18,400",
    status: "Completed",
  },
  {
    name: "Open Source Weekend",
    date: "16 Aug 2026",
    registrations: 723,
    capacity: 800,
    attendance: 648,
    revenue: "₹31,250",
    status: "Completed",
  },
  {
    name: "Developer Connect",
    date: "02 Aug 2026",
    registrations: 391,
    capacity: 500,
    attendance: 348,
    revenue: "₹12,600",
    status: "Completed",
  },
];

const chartData = {
  "7d": [420, 510, 460, 620, 580, 740, 680],
  "30d": [380, 460, 420, 510, 580, 550, 640, 620, 710, 680, 740, 820],
  "90d": [320, 410, 380, 460, 520, 490, 610, 580, 690, 740, 810, 860],
  "1y": [220, 280, 310, 390, 420, 510, 480, 620, 680, 740, 820, 910],
};

export default function EventDashboardPage() {
  const [period, setPeriod] = useState<Period>("30d");
  const [eventFilter, setEventFilter] = useState("All events");

  const data = chartData[period];

  const totalRegistrations = useMemo(
    () =>
      events.reduce((sum, event) => sum + event.registrations, 0),
    []
  );

  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#09090d]">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <LayoutDashboard size={15} />
              Dashboard
              <span>/</span>
              Events
            </div>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Event analytics
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Monitor your events, registrations and audience performance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-300 transition hover:bg-white/[0.07] sm:flex">
              <Download size={16} />
              Export
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold shadow-lg shadow-violet-600/20 transition hover:bg-violet-500">
              <CalendarDays size={16} />
              Create event
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] space-y-6 px-6 py-7">
        {/* FILTER BAR */}
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d0d12] p-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-2 text-sm text-zinc-500">
              <Filter size={15} />
              Filters
            </div>

            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-300 outline-none"
            >
              <option>All events</option>
              <option>Upcoming events</option>
              <option>Completed events</option>
            </select>
          </div>

          <div className="flex rounded-lg border border-white/10 bg-white/[0.02] p-1">
            {[
              ["7d", "7 days"],
              ["30d", "30 days"],
              ["90d", "90 days"],
              ["1y", "1 year"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setPeriod(value as Period)}
                className={`rounded-md px-3 py-1.5 text-xs transition ${
                  period === value
                    ? "bg-white/10 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group rounded-2xl border border-white/10 bg-[#0d0d12] p-5 transition hover:border-white/15 hover:bg-[#101015]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <Icon size={19} />
                  </div>

                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${
                      stat.positive
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm text-zinc-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-zinc-700">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CHART + ATTENDANCE */}
        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          {/* REGISTRATION CHART */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3
                    size={17}
                    className="text-violet-400"
                  />
                  <h2 className="text-sm font-semibold">
                    Registration overview
                  </h2>
                </div>

                <p className="mt-1 text-xs text-zinc-600">
                  Registrations across your events
                </p>
              </div>

              <button className="flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-zinc-500">
                Registrations
                <ChevronDown size={13} />
              </button>
            </div>

            <div className="mt-8 h-[280px]">
              <RegistrationChart data={data} />
            </div>
          </div>

          {/* ATTENDANCE */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-5">
            <div className="flex items-center gap-2">
              <PieChart size={17} className="text-violet-400" />

              <h2 className="text-sm font-semibold">
                Attendance rate
              </h2>
            </div>

            <p className="mt-1 text-xs text-zinc-600">
              Registered users who attended
            </p>

            <div className="relative mx-auto mt-8 flex h-48 w-48 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[18px] border-white/[0.04]" />

              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(#8b5cf6 0deg 289deg, rgba(255,255,255,0.04) 289deg 360deg)",
                  mask:
                    "radial-gradient(farthest-side, transparent calc(100% - 18px), #000 0)",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 18px), #000 0)",
                }}
              />

              <div className="relative text-center">
                <p className="text-4xl font-semibold">80.7%</p>
                <p className="mt-1 text-xs text-zinc-600">
                  attendance
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="text-xs text-zinc-600">Checked in</p>
                <p className="mt-1 text-lg font-semibold">
                  6,847
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="text-xs text-zinc-600">
                  No show
                </p>
                <p className="mt-1 text-lg font-semibold">
                  1,645
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECONDARY METRICS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={Ticket}
            title="Tickets sold"
            value="7,912"
            change="+16.2%"
          />

          <MetricCard
            icon={Users}
            title="Unique attendees"
            value="6,124"
            change="+11.4%"
          />

          <MetricCard
            icon={Wallet}
            title="Average ticket value"
            value="₹359"
            change="+8.6%"
          />

          <MetricCard
            icon={TrendingUp}
            title="Conversion rate"
            value="19.7%"
            change="+2.4%"
          />
        </div>

        {/* EVENT TABLE */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
            <div>
              <h2 className="text-sm font-semibold">
                Event performance
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                Compare registration and attendance across events
              </p>
            </div>

            <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300">
              View all
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-zinc-600">
                  <th className="px-5 py-4 font-medium">
                    Event
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Registrations
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Attendance
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Fill rate
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Revenue
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>

              <tbody>
                {events.map((event) => {
                  const fillRate = Math.round(
                    (event.registrations / event.capacity) * 100
                  );

                  const attendanceRate = Math.round(
                    (event.attendance / event.registrations) * 100
                  );

                  return (
                    <tr
                      key={event.name}
                      className="border-b border-white/[0.06] last:border-0 transition hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="max-w-[280px] truncate text-sm font-medium">
                            {event.name}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-zinc-600">
                            <CalendarDays size={12} />
                            {event.date}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-medium">
                            {event.registrations.toLocaleString()}
                          </p>

                          <p className="mt-1 text-xs text-zinc-600">
                            / {event.capacity.toLocaleString()}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-medium">
                            {event.attendance.toLocaleString()}
                          </p>

                          <p className="mt-1 text-xs text-emerald-500">
                            {attendanceRate}% attended
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="w-28">
                          <div className="mb-1.5 flex justify-between text-xs">
                            <span className="text-zinc-600">
                              capacity
                            </span>
                            <span>{fillRate}%</span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className="h-full rounded-full bg-violet-500"
                              style={{
                                width: `${Math.min(
                                  fillRate,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium">
                        {event.revenue}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            event.status === "Upcoming"
                              ? "bg-violet-500/10 text-violet-400"
                              : "bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-white/[0.05] hover:text-white">
                          <MoreHorizontal size={17} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* INSIGHTS */}
        <div className="grid gap-6 lg:grid-cols-3">
          <InsightCard
            icon={TrendingUp}
            title="Registration growth"
            value="+18.4%"
            description="Your registrations are higher than the previous period."
          />

          <InsightCard
            icon={UserCheck}
            title="Attendance"
            value="80.7%"
            description="Most registered participants are showing up to your events."
          />

          <InsightCard
            icon={Activity}
            title="Event engagement"
            value="4.8/5"
            description="Average attendee rating across your completed events."
          />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function MetricCard({
  icon: Icon,
  title,
  value,
  change,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-400">
          <Icon size={17} />
        </div>

        <span className="text-xs text-emerald-400">
          {change}
        </span>
      </div>

      <p className="mt-4 text-xs text-zinc-600">{title}</p>

      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function InsightCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
          <Icon size={17} />
        </div>

        <p className="text-sm font-medium">{title}</p>
      </div>

      <p className="mt-5 text-2xl font-semibold">{value}</p>

      <p className="mt-2 text-xs leading-5 text-zinc-600">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SIMPLE SVG CHART                                                            */
/* -------------------------------------------------------------------------- */

function RegistrationChart({
  data,
}: {
  data: number[];
}) {
  const width = 900;
  const height = 280;
  const paddingX = 10;
  const paddingY = 20;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data
    .map((value, index) => {
      const x =
        paddingX +
        (index / (data.length - 1)) *
          (width - paddingX * 2);

      const normalized =
        (value - min) / Math.max(max - min, 1);

      const y =
        height -
        paddingY -
        normalized * (height - paddingY * 2);

      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `
    ${paddingX},${height - paddingY}
    ${points}
    ${width - paddingX},${height - paddingY}
  `;

  return (
    <div className="h-full w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Grid */}
        {[0, 1, 2, 3, 4].map((line) => {
          const y =
            paddingY +
            (line / 4) *
              (height - paddingY * 2);

          return (
            <line
              key={line}
              x1={paddingX}
              x2={width - paddingX}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}

        {/* Area */}
        <polygon
          points={areaPoints}
          fill="rgba(139,92,246,0.08)"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {data.map((value, index) => {
          const x =
            paddingX +
            (index / (data.length - 1)) *
              (width - paddingX * 2);

          const normalized =
            (value - min) / Math.max(max - min, 1);

          const y =
            height -
            paddingY -
            normalized * (height - paddingY * 2);

          return (
            <circle
              key={`${value}-${index}`}
              cx={x}
              cy={y}
              r="4"
              fill="#0d0d12"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      <div className="mt-2 flex justify-between px-1 text-[10px] text-zinc-700">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  );
}