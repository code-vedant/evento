"use client";

import React, { useEffect, useState } from "react";
import {
  AtSign,
  Check,
  ImagePlus,
  Mail,
  Save,
  User,
  X,
} from "lucide-react";

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialEmail?: string;
  initialUsername?: string;
  onSave?: (profile: {
    name: string;
    email: string;
    username: string;
  }) => void;
}

const EditProfilePopup: React.FC<EditProfileProps> = ({
  isOpen,
  onClose,
  initialName = "",
  initialEmail = "",
  initialUsername = "",
  onSave,
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [username, setUsername] = useState(initialUsername);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setEmail(initialEmail);
      setUsername(initialUsername);
      setAvatar(null);
    }
  }, [isOpen, initialName, initialEmail, initialUsername]);

  if (!isOpen) return null;

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) return;

    setIsSaving(true);

    try {
      const profile = {
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
      };

      if (onSave) {
        onSave(profile);
      } else {
        console.log("Profile updated:", profile);
      }

      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12] shadow-2xl shadow-black/60">
        {/* Violet glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-fuchsia-600/10 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Update your personal information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Avatar */}
          <div className="mb-7 flex flex-col items-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={34} className="text-violet-300" />
                )}
              </div>

              <label
                htmlFor="profile-avatar"
                className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-[#0d0d12] bg-violet-600 text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500"
              >
                <ImagePlus size={15} />

                <input
                  id="profile-avatar"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <p className="mt-3 text-xs text-zinc-600">
              JPG, PNG or WebP · Max 5MB
            </p>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Full name
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="profile-username"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Username
              </label>

              <div className="relative">
                <AtSign
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  id="profile-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="yourusername"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="profile-email"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-500/10"
                />
              </div>

              <p className="mt-2 text-xs text-zinc-600">
                You may need to verify your email after changing it.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex items-center justify-end gap-3 border-t border-white/10 bg-white/[0.015] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.07] hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !name.trim() || !email.trim()}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;