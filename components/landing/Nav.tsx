"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#C9A84C]/15 px-[5vw] flex items-center justify-between h-[68px]">
      <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-black no-underline">
        <div className="w-9 h-9 bg-black rounded-[9px] flex items-center justify-center">
          <span className="text-[#F0D080] text-lg font-bold">Q</span>
        </div>
        QR Menu
      </Link>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {[
          { label: "Avantages", href: "#avantages" },
          { label: "Témoignages", href: "#temoignages" },
          { label: "Comment ça marche", href: "#comment" },
          { label: "Tarif", href: "#tarif" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-500 font-text text-sm font-medium no-underline hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/auth/register"
        className="bg-black text-[#C9A84C] rounded-lg px-5 py-2.5 text-sm font-semibold no-underline hover:bg-neutral-800 transition-colors"
      >
        Commencer gratuitement →
      </Link>
    </nav>
  );
}
