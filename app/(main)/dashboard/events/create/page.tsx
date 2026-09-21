"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Eye,
  FileText,
  GripVertical,
  ImagePlus,
  Info,
  Link2,
  MapPin,
  Plus,
  Save,
  Settings2,
  Sparkles,
  Ticket,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";

type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "phone"
  | "number"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "file";

type RegistrationField = {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
  options: string[];
};

type TicketType = {
  id: string;
  name: string;
  price: string;
  quantity: string;
};

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Basic information",
    description: "Tell people about your event",
  },
  {
    id: 2,
    title: "Date & venue",
    description: "When and where is it happening?",
  },
  {
    id: 3,
    title: "Registration form",
    description: "Collect the information you need",
  },
  {
    id: 4,
    title: "Tickets",
    description: "Configure tickets and capacity",
  },
  {
    id: 5,
    title: "Settings",
    description: "Configure event behaviour",
  },
];

const fieldTypes: {
  type: FieldType;
  label: string;
  description: string;
}[] = [
  {
    type: "text",
    label: "Short text",
    description: "Names, college, branch etc.",
  },
  {
    type: "textarea",
    label: "Long text",
    description: "Descriptions and answers",
  },
  {
    type: "email",
    label: "Email",
    description: "Email address",
  },
  {
    type: "phone",
    label: "Phone",
    description: "Mobile number",
  },
  {
    type: "number",
    label: "Number",
    description: "Age, quantity etc.",
  },
  {
    type: "select",
    label: "Dropdown",
    description: "Choose one option",
  },
  {
    type: "radio",
    label: "Multiple choice",
    description: "Select one option",
  },
  {
    type: "checkbox",
    label: "Checkbox",
    description: "Yes/no or multiple values",
  },
  {
    type: "date",
    label: "Date",
    description: "Select a date",
  },
  {
    type: "file",
    label: "File upload",
    description: "Collect documents",
  },
];

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showFieldMenu, setShowFieldMenu] = useState(false);
  const [eventPublished, setEventPublished] = useState(false);

  const [event, setEvent] = useState({
    title: "",
    category: "Technology",
    description: "",
    banner: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    venue: "",
    address: "",
    city: "",
    online: false,
    meetingLink: "",
    capacity: "",
    registrationDeadline: "",
  });

  const [fields, setFields] = useState<RegistrationField[]>([
    {
      id: crypto.randomUUID(),
      type: "text",
      label: "Full name",
      placeholder: "Enter your full name",
      required: true,
      options: [],
    },
    {
      id: crypto.randomUUID(),
      type: "email",
      label: "Email address",
      placeholder: "you@example.com",
      required: true,
      options: [],
    },
  ]);

  const [tickets, setTickets] = useState<TicketType[]>([
    {
      id: crypto.randomUUID(),
      name: "General Admission",
      price: "0",
      quantity: "",
    },
  ]);

  const updateEvent = (
    key: keyof typeof event,
    value: string | boolean
  ) => {
    setEvent((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const addField = (type: FieldType) => {
    const config = fieldTypes.find((item) => item.type === type);

    const newField: RegistrationField = {
      id: crypto.randomUUID(),
      type,
      label: config?.label ?? "Custom field",
      placeholder: "",
      required: false,
      options:
        type === "select" || type === "radio"
          ? ["Option 1", "Option 2"]
          : [],
    };

    setFields((previous) => [...previous, newField]);
    setShowFieldMenu(false);
  };

  const updateField = (
    id: string,
    key: keyof RegistrationField,
    value: string | boolean | string[]
  ) => {
    setFields((previous) =>
      previous.map((field) =>
        field.id === id
          ? {
              ...field,
              [key]: value,
            }
          : field
      )
    );
  };

  const deleteField = (id: string) => {
    setFields((previous) =>
      previous.filter((field) => field.id !== id)
    );
  };

  const duplicateField = (field: RegistrationField) => {
    setFields((previous) => [
      ...previous,
      {
        ...field,
        id: crypto.randomUUID(),
        label: `${field.label} copy`,
      },
    ]);
  };

  const addTicket = () => {
    setTickets((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        name: `Ticket ${previous.length + 1}`,
        price: "0",
        quantity: "",
      },
    ]);
  };

  const updateTicket = (
    id: string,
    key: keyof TicketType,
    value: string
  ) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              [key]: value,
            }
          : ticket
      )
    );
  };

  const deleteTicket = (id: string) => {
    if (tickets.length === 1) return;

    setTickets((previous) =>
      previous.filter((ticket) => ticket.id !== id)
    );
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((previous) => previous + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const progress = (currentStep / steps.length) * 100;

  const totalFields = fields.length;

  const isFreeEvent = useMemo(
    () =>
      tickets.every(
        (ticket) =>
          ticket.price === "" ||
          Number(ticket.price) === 0
      ),
    [tickets]
  );

  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090d]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/events"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:bg-white/[0.07] hover:text-white"
            >
              <ArrowLeft size={17} />
            </Link>

            <div className="h-6 w-px bg-white/10" />

            <div>
              <p className="text-sm font-semibold">
                Create event
              </p>
              <p className="text-xs text-zinc-600">
                Draft · Not published
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.07] hover:text-white sm:flex"
            >
              <Eye size={16} />
              Preview
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.07]"
            >
              <Save size={16} />
              Save draft
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="h-[2px] bg-white/[0.04]">
          <div
            className="h-full bg-violet-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* STEPPER */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-5 text-xs font-medium uppercase tracking-wider text-zinc-600">
                Create your event
              </p>

              <div className="space-y-1">
                {steps.map((step) => {
                  const active = currentStep === step.id;
                  const completed = currentStep > step.id;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        if (step.id <= currentStep) {
                          setCurrentStep(step.id);
                        }
                      }}
                      className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                        active
                          ? "bg-violet-500/[0.08]"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                          completed
                            ? "border-violet-500 bg-violet-500 text-white"
                            : active
                              ? "border-violet-500 text-violet-400"
                              : "border-white/10 text-zinc-600"
                        }`}
                      >
                        {completed ? (
                          <Check size={13} />
                        ) : (
                          step.id
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-medium ${
                            active
                              ? "text-white"
                              : "text-zinc-500"
                          }`}
                        >
                          {step.title}
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-zinc-700">
                          {step.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Draft status */}
              <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-zinc-400">
                    Autosaved
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-zinc-700">
                  Your changes are automatically saved while you create
                  your event.
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="max-w-4xl">
            {/* MOBILE STEP */}
            <div className="mb-6 lg:hidden">
              <p className="text-xs text-zinc-600">
                Step {currentStep} of {steps.length}
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                {steps[currentStep - 1].title}
              </h1>
            </div>

            {/* STEP 1 */}
            {currentStep === 1 && (
              <BasicInformation
                event={event}
                updateEvent={updateEvent}
              />
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <DateAndVenue
                event={event}
                updateEvent={updateEvent}
              />
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <RegistrationBuilder
                fields={fields}
                showFieldMenu={showFieldMenu}
                setShowFieldMenu={setShowFieldMenu}
                addField={addField}
                updateField={updateField}
                deleteField={deleteField}
                duplicateField={duplicateField}
                totalFields={totalFields}
              />
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <TicketBuilder
                tickets={tickets}
                addTicket={addTicket}
                updateTicket={updateTicket}
                deleteTicket={deleteTicket}
                isFreeEvent={isFreeEvent}
              />
            )}

            {/* STEP 5 */}
            {currentStep === 5 && (
              <EventSettings
                event={event}
                updateEvent={updateEvent}
              />
            )}

            {/* FOOTER NAVIGATION */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-zinc-400 transition hover:bg-white/[0.07] hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEventPublished(true)}
                  className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
                >
                  <Sparkles size={16} />
                  Publish event
                </button>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* PUBLISHED */}
      {eventPublished && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101015] p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Check size={26} />
            </div>

            <div className="mt-5 text-center">
              <h2 className="text-xl font-semibold">
                Event ready to publish
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Your event has been configured successfully. Connect your
                API/Supabase publish action here.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs text-zinc-600">
                Event
              </p>
              <p className="mt-1 text-sm font-medium">
                {event.title || "Untitled event"}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-zinc-600">
                    Registration fields
                  </p>
                  <p className="mt-1 text-sm">
                    {fields.length}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-600">
                    Ticket types
                  </p>
                  <p className="mt-1 text-sm">
                    {tickets.length}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEventPublished(false)}
              className="mt-5 w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold hover:bg-violet-500"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* BASIC INFORMATION                                                         */
/* ========================================================================= */

function BasicInformation({
  event,
  updateEvent,
}: {
  event: any;
  updateEvent: (
    key: string,
    value: string | boolean
  ) => void;
}) {
  return (
    <div className="space-y-6">
      <PageHeading
        icon={Sparkles}
        title="Basic information"
        description="Give your event a clear identity and help attendees understand what it is about."
      />

      <Card>
        <FieldLabel
          label="Event title"
          required
          description="Keep it short, clear and memorable."
        />

        <input
          value={event.title}
          onChange={(e) =>
            updateEvent("title", e.target.value)
          }
          placeholder="e.g. AWS Student Community Day Bhilai 2026"
          className="input mt-3"
        />

        <div className="mt-6">
          <FieldLabel
            label="Category"
            required
          />

          <div className="relative mt-3">
            <select
              value={event.category}
              onChange={(e) =>
                updateEvent("category", e.target.value)
              }
              className="input appearance-none"
            >
              <option>Technology</option>
              <option>Workshop</option>
              <option>Hackathon</option>
              <option>Cultural</option>
              <option>Sports</option>
              <option>Business</option>
              <option>Networking</option>
              <option>Academic</option>
              <option>Other</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600"
            />
          </div>
        </div>

        <div className="mt-6">
          <FieldLabel
            label="Description"
            required
            description="Explain what attendees can expect."
          />

          <textarea
            value={event.description}
            onChange={(e) =>
              updateEvent("description", e.target.value)
            }
            rows={7}
            placeholder="Tell attendees about your event..."
            className="input mt-3 resize-none"
          />

          <p className="mt-2 text-right text-xs text-zinc-700">
            {event.description.length}/2000
          </p>
        </div>
      </Card>

      <Card>
        <FieldLabel
          label="Event banner"
          description="Recommended size: 1600 × 900px"
        />

        <label className="mt-3 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] transition hover:border-violet-500/40 hover:bg-violet-500/[0.02]">
          <ImagePlus size={25} className="text-zinc-600" />

          <p className="mt-3 text-sm font-medium">
            Upload event banner
          </p>

          <p className="mt-1 text-xs text-zinc-700">
            PNG, JPG or WebP · Max 10MB
          </p>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />
        </label>
      </Card>
    </div>
  );
}

/* ========================================================================= */
/* DATE AND VENUE                                                            */
/* ========================================================================= */

function DateAndVenue({
  event,
  updateEvent,
}: {
  event: any;
  updateEvent: (
    key: string,
    value: string | boolean
  ) => void;
}) {
  return (
    <div className="space-y-6">
      <PageHeading
        icon={CalendarDays}
        title="Date & venue"
        description="Set when your event happens and where attendees should go."
      />

      <Card>
        <div className="grid gap-5 sm:grid-cols-2">
          <DateField
            label="Start date"
            value={event.startDate}
            onChange={(value) =>
              updateEvent("startDate", value)
            }
          />

          <TimeField
            label="Start time"
            value={event.startTime}
            onChange={(value) =>
              updateEvent("startTime", value)
            }
          />

          <DateField
            label="End date"
            value={event.endDate}
            onChange={(value) =>
              updateEvent("endDate", value)
            }
          />

          <TimeField
            label="End time"
            value={event.endTime}
            onChange={(value) =>
              updateEvent("endTime", value)
            }
          />
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Event format
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              Choose where your event takes place.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              updateEvent("online", !event.online)
            }
            className={`relative h-6 w-11 rounded-full transition ${
              event.online
                ? "bg-violet-600"
                : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                event.online
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>
        </div>

        <div className="mt-6">
          {event.online ? (
            <>
              <FieldLabel
                label="Meeting link"
                required
              />

              <div className="relative mt-3">
                <Link2
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  value={event.meetingLink}
                  onChange={(e) =>
                    updateEvent(
                      "meetingLink",
                      e.target.value
                    )
                  }
                  placeholder="https://meet.google.com/..."
                  className="input pl-10"
                />
              </div>
            </>
          ) : (
            <div className="space-y-5">
              <div>
                <FieldLabel
                  label="Venue name"
                  required
                />

                <div className="relative mt-3">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    value={event.venue}
                    onChange={(e) =>
                      updateEvent(
                        "venue",
                        e.target.value
                      )
                    }
                    placeholder="e.g. SSTC Auditorium"
                    className="input pl-10"
                  />
                </div>
              </div>

              <div>
                <FieldLabel
                  label="Address"
                  required
                />

                <input
                  value={event.address}
                  onChange={(e) =>
                    updateEvent(
                      "address",
                      e.target.value
                    )
                  }
                  placeholder="Full venue address"
                  className="input mt-3"
                />
              </div>

              <div>
                <FieldLabel
                  label="City"
                  required
                />

                <input
                  value={event.city}
                  onChange={(e) =>
                    updateEvent("city", e.target.value)
                  }
                  placeholder="e.g. Bhilai"
                  className="input mt-3"
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ========================================================================= */
/* REGISTRATION BUILDER                                                      */
/* ========================================================================= */

function RegistrationBuilder({
  fields,
  showFieldMenu,
  setShowFieldMenu,
  addField,
  updateField,
  deleteField,
  duplicateField,
  totalFields,
}: {
  fields: RegistrationField[];
  showFieldMenu: boolean;
  setShowFieldMenu: (value: boolean) => void;
  addField: (type: FieldType) => void;
  updateField: (
    id: string,
    key: keyof RegistrationField,
    value: string | boolean | string[]
  ) => void;
  deleteField: (id: string) => void;
  duplicateField: (field: RegistrationField) => void;
  totalFields: number;
}) {
  return (
    <div className="space-y-6">
      <PageHeading
        icon={Settings2}
        title="Registration form"
        description="Build the registration form your attendees will fill out."
      />

      {/* Info */}
      <div className="flex gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] p-4">
        <Info
          size={17}
          className="mt-0.5 shrink-0 text-violet-400"
        />

        <div>
          <p className="text-sm font-medium text-violet-300">
            Make your form work for your event
          </p>

          <p className="mt-1 text-xs leading-5 text-zinc-500">
            Only collect information you actually need. Required fields
            must be completed before registration.
          </p>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-sm font-semibold">
              Registration fields
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              {totalFields} fields · Drag to reorder
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowFieldMenu(!showFieldMenu)
              }
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
            >
              <Plus size={16} />
              Add field
            </button>

            {showFieldMenu && (
              <div className="absolute right-0 top-11 z-30 w-72 overflow-hidden rounded-xl border border-white/10 bg-[#111116] p-2 shadow-2xl">
                <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Field type
                </p>

                {fieldTypes.map((field) => (
                  <button
                    key={field.type}
                    type="button"
                    onClick={() => addField(field.type)}
                    className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[0.05]"
                  >
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.05] text-zinc-400">
                      <FieldIcon type={field.type} />
                    </div>

                    <div>
                      <p className="text-sm text-zinc-200">
                        {field.label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-zinc-600">
                        {field.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 pt-5">
          {fields.map((field, index) => (
            <RegistrationFieldEditor
              key={field.id}
              field={field}
              index={index}
              updateField={updateField}
              deleteField={deleteField}
              duplicateField={duplicateField}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => addField("text")}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-4 text-sm text-zinc-600 transition hover:border-violet-500/30 hover:bg-violet-500/[0.02] hover:text-violet-400"
        >
          <Plus size={16} />
          Add another field
        </button>
      </Card>
    </div>
  );
}

/* ========================================================================= */
/* FIELD EDITOR                                                              */
/* ========================================================================= */

function RegistrationFieldEditor({
  field,
  index,
  updateField,
  deleteField,
  duplicateField,
}: {
  field: RegistrationField;
  index: number;
  updateField: (
    id: string,
    key: keyof RegistrationField,
    value: string | boolean | string[]
  ) => void;
  deleteField: (id: string) => void;
  duplicateField: (field: RegistrationField) => void;
}) {
  const needsOptions =
    field.type === "select" ||
    field.type === "radio";

  return (
    <div className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/15">
      <div className="flex gap-3">
        <div className="hidden cursor-grab pt-2 text-zinc-700 sm:block">
          <GripVertical size={17} />
        </div>

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
          <FieldIcon type={field.type} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-zinc-600">
                Field {index + 1}
              </p>

              <p className="mt-0.5 text-sm font-medium text-zinc-300">
                {getFieldTypeName(field.type)}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => duplicateField(field)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-white/[0.05] hover:text-white"
                title="Duplicate field"
              >
                <Copy size={15} />
              </button>

              <button
                type="button"
                onClick={() => deleteField(field.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                title="Delete field"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs text-zinc-500">
                Field label
              </label>

              <input
                value={field.label}
                onChange={(e) =>
                  updateField(
                    field.id,
                    "label",
                    e.target.value
                  )
                }
                className="input"
                placeholder="e.g. College name"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-zinc-500">
                Placeholder
              </label>

              <input
                value={field.placeholder}
                onChange={(e) =>
                  updateField(
                    field.id,
                    "placeholder",
                    e.target.value
                  )
                }
                className="input"
                placeholder="What should the user enter?"
              />
            </div>
          </div>

          {needsOptions && (
            <div className="mt-4">
              <label className="mb-2 block text-xs text-zinc-500">
                Options
              </label>

              <div className="space-y-2">
                {field.options.map((option, optionIndex) => (
                  <div
                    key={`${field.id}-${optionIndex}`}
                    className="flex gap-2"
                  >
                    <input
                      value={option}
                      onChange={(e) => {
                        const options = [...field.options];
                        options[optionIndex] =
                          e.target.value;

                        updateField(
                          field.id,
                          "options",
                          options
                        );
                      }}
                      className="input"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const options =
                          field.options.filter(
                            (_, i) =>
                              i !== optionIndex
                          );

                        updateField(
                          field.id,
                          "options",
                          options
                        );
                      }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-600 hover:border-red-500/20 hover:text-red-400"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    updateField(field.id, "options", [
                      ...field.options,
                      `Option ${field.options.length + 1}`,
                    ])
                  }
                  className="text-xs text-violet-400 hover:text-violet-300"
                >
                  + Add option
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
            <div>
              <p className="text-xs text-zinc-400">
                Required field
              </p>

              <p className="mt-1 text-[11px] text-zinc-700">
                Attendees must complete this field.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                updateField(
                  field.id,
                  "required",
                  !field.required
                )
              }
              className={`relative h-6 w-11 rounded-full transition ${
                field.required
                  ? "bg-violet-600"
                  : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  field.required
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* TICKETS                                                                   */
/* ========================================================================= */

function TicketBuilder({
  tickets,
  addTicket,
  updateTicket,
  deleteTicket,
  isFreeEvent,
}: {
  tickets: TicketType[];
  addTicket: () => void;
  updateTicket: (
    id: string,
    key: keyof TicketType,
    value: string
  ) => void;
  deleteTicket: (id: string) => void;
  isFreeEvent: boolean;
}) {
  return (
    <div className="space-y-6">
      <PageHeading
        icon={Ticket}
        title="Tickets"
        description="Configure how attendees can register for your event."
      />

      <Card>
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-sm font-semibold">
              Ticket types
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Create multiple ticket tiers if needed.
            </p>
          </div>

          <button
            type="button"
            onClick={addTicket}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-300 hover:bg-white/[0.07]"
          >
            <Plus size={15} />
            Add ticket
          </button>
        </div>

        <div className="space-y-4 pt-5">
          {tickets.map((ticket, index) => (
            <div
              key={ticket.id}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-xs text-violet-400">
                    {index + 1}
                  </div>

                  <span className="text-sm font-medium">
                    Ticket type
                  </span>
                </div>

                {tickets.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      deleteTicket(ticket.id)
                    }
                    className="text-zinc-600 hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs text-zinc-500">
                    Name
                  </label>

                  <input
                    value={ticket.name}
                    onChange={(e) =>
                      updateTicket(
                        ticket.id,
                        "name",
                        e.target.value
                      )
                    }
                    className="input"
                    placeholder="General Admission"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-zinc-500">
                    Price (INR)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={ticket.price}
                    onChange={(e) =>
                      updateTicket(
                        ticket.id,
                        "price",
                        e.target.value
                      )
                    }
                    className="input"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-zinc-500">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={ticket.quantity}
                    onChange={(e) =>
                      updateTicket(
                        ticket.id,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="input"
                    placeholder="Unlimited"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Ticket size={17} />
          </div>

          <p className="mt-4 text-sm font-medium">
            {isFreeEvent
              ? "Free event"
              : "Paid event"}
          </p>

          <p className="mt-1 text-xs leading-5 text-zinc-600">
            {isFreeEvent
              ? "Attendees can register without making a payment."
              : "Attendees will need to complete payment during registration."}
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
            <Users size={17} />
          </div>

          <p className="mt-4 text-sm font-medium">
            Capacity
          </p>

          <p className="mt-1 text-xs leading-5 text-zinc-600">
            Set your maximum capacity in the event settings.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* SETTINGS                                                                   */
/* ========================================================================= */

function EventSettings({
  event,
  updateEvent,
}: {
  event: any;
  updateEvent: (
    key: string,
    value: string | boolean
  ) => void;
}) {
  return (
    <div className="space-y-6">
      <PageHeading
        icon={Settings2}
        title="Event settings"
        description="Configure registration rules and attendee experience."
      />

      <Card>
        <FieldLabel
          label="Maximum capacity"
          description="Leave empty for unlimited registrations."
        />

        <div className="relative mt-3 max-w-sm">
          <Users
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            type="number"
            min="1"
            value={event.capacity}
            onChange={(e) =>
              updateEvent(
                "capacity",
                e.target.value
              )
            }
            placeholder="e.g. 500"
            className="input pl-10"
          />
        </div>
      </Card>

      <Card>
        <FieldLabel
          label="Registration deadline"
          description="After this date, attendees will no longer be able to register."
        />

        <div className="relative mt-3 max-w-sm">
          <CalendarDays
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            type="datetime-local"
            value={event.registrationDeadline}
            onChange={(e) =>
              updateEvent(
                "registrationDeadline",
                e.target.value
              )
            }
            className="input pl-10"
          />
        </div>
      </Card>

      <Card>
        <SettingToggle
          title="Allow attendee cancellation"
          description="Attendees can cancel their registration before the event."
          enabled={true}
        />

        <SettingToggle
          title="Show attendee count"
          description="Display the number of registered attendees publicly."
          enabled={false}
        />

        <SettingToggle
          title="Enable waitlist"
          description="Allow users to join a waitlist when capacity is reached."
          enabled={true}
        />

        <SettingToggle
          title="Require email verification"
          description="Require attendees to verify their email before completing registration."
          enabled={false}
        />
      </Card>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
        <div className="flex gap-3">
          <Info
            size={17}
            className="mt-0.5 shrink-0 text-amber-400"
          />

          <div>
            <p className="text-sm font-medium text-amber-300">
              Before publishing
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Make sure your event information, registration fields,
              ticket prices and venue details are correct.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* SHARED COMPONENTS                                                          */
/* ========================================================================= */

function PageHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <Icon size={19} />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          {title}
        </h1>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0d0d12] p-5 sm:p-6">
      {children}
    </section>
  );
}

function FieldLabel({
  label,
  required,
  description,
}: {
  label: string;
  required?: boolean;
  description?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium text-zinc-300">
          {label}
        </label>

        {required && (
          <span className="text-violet-400">*</span>
        )}
      </div>

      {description && (
        <p className="mt-1 text-xs text-zinc-600">
          {description}
        </p>
      )}
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} required />

      <div className="relative mt-3">
        <CalendarDays
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
        />

        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input pl-10"
        />
      </div>
    </div>
  );
}

function TimeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} required />

      <div className="relative mt-3">
        <Clock
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
        />

        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input pl-10"
        />
      </div>
    </div>
  );
}

function SettingToggle({
  title,
  description,
  enabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
}) {
  const [active, setActive] = useState(enabled);

  return (
    <div className="flex items-center justify-between gap-5 border-b border-white/[0.06] py-4 first:pt-0 last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-zinc-300">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-600">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setActive(!active)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          active
            ? "bg-violet-600"
            : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            active ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

/* ========================================================================= */
/* FIELD HELPERS                                                              */
/* ========================================================================= */

function FieldIcon({
  type,
}: {
  type: FieldType;
}) {
  switch (type) {
    case "file":
      return <Upload size={14} />;

    case "date":
      return <CalendarDays size={14} />;

    case "checkbox":
      return <Check size={14} />;

    case "select":
    case "radio":
      return <ChevronDown size={14} />;

    case "phone":
      return <span className="text-[10px]">TEL</span>;

    case "email":
      return <span className="text-[10px]">@</span>;

    case "number":
      return <span className="text-[10px]">123</span>;

    case "textarea":
      return <FileText size={14} />;

    default:
      return <FileText size={14} />;
  }
}

function getFieldTypeName(type: FieldType) {
  return (
    fieldTypes.find((field) => field.type === type)
      ?.label ?? "Custom field"
  );
}