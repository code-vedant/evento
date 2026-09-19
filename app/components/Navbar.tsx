import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-8 py-4 md:px-28">
      <div className="flex items-center gap-12 md:gap-20">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Neuralyn logo"
          width={500}
          height={500}
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl font-bold tracking-tight">
            Neuralyn
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a
            href="#home"
            className="transition-colors hover:text-white"
          >
            Home
          </a>

          <a
            href="#services"
            className="flex items-center gap-1 transition-colors hover:text-white"
          >
            Services
            <ChevronDown size={15} />
          </a>

          <a
            href="#reviews"
            className="transition-colors hover:text-white"
          >
            Reviews
          </a>

          <a
            href="#contact"
            className="transition-colors hover:text-white"
          >
            Contact us
          </a>
        </div>
      </div>

      <button className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-80">
        Sign In
      </button>
    </nav>
  );
}