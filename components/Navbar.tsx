"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-border animate-slide-down">
      <Link href="/">
        <h1 className="text-2xl font-serif font-bold tracking-tight text-white hover:text-accent transition-colors duration-300 cursor-pointer">
          Nex<span className="text-accent italic font-light">Blog</span>
        </h1>
      </Link>

      <div className="flex gap-10 items-center">
        <Link
          href="/"
          className="text-sm tracking-widest uppercase font-medium text-gray-400 hover:text-accent transition-colors duration-300 relative group"
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          href="/authors"
          className="text-sm tracking-widest uppercase font-medium text-gray-400 hover:text-accent transition-colors duration-300 relative group"
        >
          Authors
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
    </nav>
  );
}

