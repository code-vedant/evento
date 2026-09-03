import Link from 'next/link';
import React from 'react';

export default function HeaderLanding() {
    return (
        <header className="w-full text-amber-50 fixed top-0 z-50">
            <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-12">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <h2>evento</h2>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex gap-6">
                    <Link href="/" className="hover:text-amber-400 transition">Clubs</Link>
                    <Link href="/" className="hover:text-red-400 transition">Events</Link>
                    <Link href="/" className="hover:text-red-400 transition">Services</Link>
                    <Link href="/" className="hover:text-red-400 transition">Pricing</Link>
                </nav>

                {/* Auth Links */}
                <div className="hidden md:flex gap-4 items-center">
                    <Link href="/" className="hover:text-red-400 transition">Login</Link>
                    <Link href="/" className="bg-red-400 text-black px-4 py-2 rounded-full hover:bg-red-500 transition">Sign Up</Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="text-red-50 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
