"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CAL_LINK } from "@/lib/cal";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#work" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Why TecDit", href: "/#why-tecdit" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-white/90 shadow-[0_1px_0_0_rgba(15,20,35,0.06)] backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.jpeg"
            alt="TecDit"
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="font-display text-lg font-bold tracking-tight text-ink-900">
            TecDit
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-500 transition-colors hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop: icon + number + availability */}
          <a
            href="tel:+923094187234"
            className="group hidden flex-col leading-tight lg:flex"
          >
            <span className="flex items-center gap-1.5 text-sm font-medium text-ink-700 transition-colors group-hover:text-brand-600">
              <Phone className="size-4 text-brand-600" />
              +92 309 4187234
            </span>
            <span className="pl-5.5 text-xs text-ink-400">
              Mon–Fri, 9am–2pm ET
            </span>
          </a>

          {/* Tablet: number only */}
          <a
            href="tel:+923094187234"
            className="hidden items-center gap-1.5 text-sm font-medium text-ink-700 transition-colors hover:text-brand-600 sm:flex lg:hidden"
          >
            <Phone className="size-4 text-brand-600" />
            +92 309 4187234
          </a>

          {/* Mobile: icon-only tap target */}
          <a
            href="tel:+923094187234"
            aria-label="Call TecDit"
            className="flex size-11 items-center justify-center text-ink-700 transition-colors hover:text-brand-600 sm:hidden"
          >
            <Phone className="size-5" />
          </a>

          <div className="hidden lg:block">
            <Button calLink={CAL_LINK} size="md">
              Book a Free Call
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full text-ink-900 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-white px-6 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button calLink={CAL_LINK} size="lg" className="mt-4 w-full">
            Book a Free Call
          </Button>
        </div>
      )}
    </header>
  );
}
