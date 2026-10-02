"use client";

import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  ImagePlus,
  Link2,
  MapPin,
  Plus,
  Save,
  Ticket,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

const categories = [
  "Technology",
  "Workshop",
  "Hackathon",
  "Competition",
  "Cultural",
  "Sports",
  "Community",
  "Other",
];

export default function CreateEventPage() {
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [locationType, setLocationType] = useState<"offline" | "online">(
    "offline"
  );
  const [poster, setPoster] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  function addTag() {
    const tag = tagInput.trim();

    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }

    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(tags.filter((item) => item !== tag));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Connect this to your API/server action later.
    // Example payload:
    // {
    //   title, slug, description, category, date, startTime,
    //   endTime, locationType, location, meetingUrl, capacity,
    //   registrationRequired, organizer, tags, status
    // }

    console.log("Create event", { status, locationType, tags });
  }

  function handlePosterChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setPoster(URL.createObjectURL(file));
  }

  return (
    <main className="min-h-screen bg-[#08080b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#08080b]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/tenant/admin/events"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:bg-white/[0.07] hover:text-white"
              aria-label="Back to events"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <p className="text-sm font-semibold">Create event</p>
              <p className="text-xs text-zinc-500">
                Add a new event to your community
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                status === "published"
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                  : "border-amber-400/20 bg-amber-400/10 text-amber-300"
              }`}
            >
              {status === "published" ? "Ready to publish" : "Draft"}
            </span>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Main form */}
            <div className="space-y-6">
              {/* Basic information */}
              <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
                <div className="mb-6">
                  <h2 className="text-base font-semibold">Event information</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Give your event a clear identity and description.
                  </p>
                </div>

                <div className="space-y-5">
                  <Field label="Event title" required>
                    <input
                      name="title"
                      required
                      placeholder="e.g. Intro to Cloud Computing"
                      className="input"
                    />
                  </Field>

                  <Field label="Event slug">
                    <div className="flex overflow-hidden rounded-xl border border-white/10 bg-black/20">
                      <span className="flex items-center border-r border-white/10 px-3 text-xs text-zinc-600">
                        evento.com/events/
                      </span>
                      <input
                        name="slug"
                        placeholder="intro-to-cloud-computing"
                        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-700"
                      />
                    </div>
                  </Field>

                  <Field label="Description" required>
                    <textarea
                      name="description"
                      required
                      rows={6}
                      placeholder="Tell students what this event is about..."
                      className="input resize-none"
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Category">
                      <div className="relative">
                        <select
                          name="category"
                          className="input appearance-none"
                        >
                          {categories.map((category) => (
                            <option key={category}>{category}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                      </div>
                    </Field>

                    <Field label="Organizer">
                      <input
                        name="organizer"
                        placeholder="Your club / community"
                        className="input"
                      />
                    </Field>
                  </div>
                </div>
              </section>

              {/* Date & location */}
              <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
                <div className="mb-6">
                  <h2 className="text-base font-semibold">
                    Date, time & location
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Let attendees know exactly when and where to join.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-3">
                    <Field label="Date" required>
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                        <input
                          type="date"
                          name="date"
                          required
                          className="input pl-10"
                        />
                      </div>
                    </Field>

                    <Field label="Start time" required>
                      <div className="relative">
                        <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                        <input
                          type="time"
                          name="startTime"
                          required
                          className="input pl-10"
                        />
                      </div>
                    </Field>

                    <Field label="End time">
                      <div className="relative">
                        <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                        <input
                          type="time"
                          name="endTime"
                          className="input pl-10"
                        />
                      </div>
                    </Field>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Event format
                    </label>

                    <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/20 p-1">
                      <button
                        type="button"
                        onClick={() => setLocationType("offline")}
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                          locationType === "offline"
                            ? "bg-white text-black"
                            : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        In person
                      </button>

                      <button
                        type="button"
                        onClick={() => setLocationType("online")}
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                          locationType === "online"
                            ? "bg-white text-black"
                            : "text-zinc-500 hover:text-white"
                        }`}
                      >
                        Online
                      </button>
                    </div>
                  </div>

                  {locationType === "offline" ? (
                    <Field label="Venue" required>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                        <input
                          name="location"
                          required
                          placeholder="e.g. Main Auditorium, SSTC Bhilai"
                          className="input pl-10"
                        />
                      </div>
                    </Field>
                  ) : (
                    <Field label="Meeting link" required>
                      <div className="relative">
                        <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                        <input
                          name="meetingUrl"
                          type="url"
                          required
                          placeholder="https://meet.google.com/..."
                          className="input pl-10"
                        />
                      </div>
                    </Field>
                  )}
                </div>
              </section>

              {/* Registration */}
              <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
                <div className="mb-6">
                  <h2 className="text-base font-semibold">Registration</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Configure how students can register for your event.
                  </p>
                </div>

                <div className="space-y-5">
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
                        <Ticket className="h-4 w-4 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Require registration
                        </p>
                        <p className="text-xs text-zinc-500">
                          Attendees must register before the event.
                        </p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      name="registrationRequired"
                      defaultChecked
                      className="h-4 w-4 accent-violet-600"
                    />
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Maximum capacity">
                      <div className="relative">
                        <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                        <input
                          name="capacity"
                          type="number"
                          min="1"
                          placeholder="e.g. 200"
                          className="input pl-10"
                        />
                      </div>
                    </Field>

                    <Field label="Registration deadline">
                      <input
                        name="registrationDeadline"
                        type="datetime-local"
                        className="input"
                      />
                    </Field>
                  </div>
                </div>
              </section>

              {/* Tags */}
              <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
                <div className="mb-5">
                  <h2 className="text-base font-semibold">Tags</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Help students discover your event.
                  </p>
                </div>

                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="e.g. AWS"
                    className="input"
                  />

                  <button
                    type="button"
                    onClick={addTag}
                    className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium transition hover:bg-white/[0.08]"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>

                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-300"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          aria-label={`Remove ${tag}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
              {/* Poster */}
              <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
                <div className="mb-5">
                  <h2 className="text-base font-semibold">Event poster</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Recommended: 16:9 or 4:3 image.
                  </p>
                </div>

                <label className="group relative block aspect-video cursor-pointer overflow-hidden rounded-xl border border-dashed border-white/15 bg-black/20 transition hover:border-violet-400/40">
                  {poster ? (
                    <>
                      <img
                        src={poster}
                        alt="Event poster preview"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                        <span className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black">
                          Change image
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                        <ImagePlus className="h-5 w-5 text-violet-400" />
                      </div>
                      <p className="text-sm font-medium">Upload event poster</p>
                      <p className="mt-1 text-xs text-zinc-600">
                        PNG, JPG or WebP
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePosterChange}
                    className="sr-only"
                  />
                </label>
              </section>

              {/* Publish */}
              <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
                <h2 className="text-base font-semibold">Publish</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Choose what happens when you save this event.
                </p>

                <div className="mt-5 space-y-2">
                  <button
                    type="button"
                    onClick={() => setStatus("draft")}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                      status === "draft"
                        ? "border-violet-400/30 bg-violet-400/10"
                        : "border-white/10 bg-black/20 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">Save as draft</p>
                      <p className="mt-0.5 text-xs text-zinc-600">
                        Only admins can see it.
                      </p>
                    </div>

                    {status === "draft" && (
                      <Check className="h-4 w-4 text-violet-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus("published")}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                      status === "published"
                        ? "border-violet-400/30 bg-violet-400/10"
                        : "border-white/10 bg-black/20 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">Publish event</p>
                      <p className="mt-0.5 text-xs text-zinc-600">
                        Make it visible to your community.
                      </p>
                    </div>

                    {status === "published" && (
                      <Check className="h-4 w-4 text-violet-400" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold transition hover:bg-violet-500"
                >
                  <Save className="h-4 w-4" />
                  {status === "published" ? "Publish event" : "Save draft"}
                </button>
              </section>

              <p className="px-2 text-xs leading-5 text-zinc-600">
                You can edit the event after saving. Publishing makes the event
                available on your tenant&apos;s public events page.
              </p>
            </aside>
          </div>
        </div>
      </form>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.2);
          padding: 0.75rem 0.875rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: border-color 150ms ease, background 150ms ease;
        }

        .input::placeholder {
          color: rgb(63 63 70);
        }

        .input:focus {
          border-color: rgba(167, 139, 250, 0.5);
          background: rgba(0, 0, 0, 0.3);
        }

        select.input option {
          background: #18181b;
          color: white;
        }

        input[type="date"],
        input[type="time"],
        input[type="datetime-local"] {
          color-scheme: dark;
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
        {required && <span className="ml-1 text-violet-400">*</span>}
      </label>
      {children}
    </div>
  );
}
