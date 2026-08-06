import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CAL_LINK } from "@/lib/cal";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Our Work", href: "/#work" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.jpeg"
                alt="TecDit"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-display text-lg font-bold tracking-tight text-ink-900">
                TecDit
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
              Premium websites for local businesses across the United States,
              built to earn trust and win more customers.
            </p>
            <Button calLink={CAL_LINK} size="md" className="mt-6">
              Book a Free Call
            </Button>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-ink-900">{column.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-500 transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-ink-900">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="tel:+19716682679"
                  className="flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-brand-600"
                >
                  <Phone className="size-4" />
                  (971) 668-2679
                </a>
                <span className="mt-1 block pl-6 text-xs text-ink-400">
                  Mon–Fri, 9am–2pm ET
                </span>
              </li>
              <li>
                <a
                  href="mailto:hello@tecdit.com"
                  className="flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-brand-600"
                >
                  <Mail className="size-4" />
                  hello@tecdit.com
                </a>
              </li>
              <li className="text-sm text-ink-500">
                Serving local businesses nationwide across the United States.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-ink-400">
            © {new Date().getFullYear()} TecDit. All rights reserved.
          </p>
          <p className="text-sm text-ink-400">Websites built to grow local businesses.</p>
        </div>
      </Container>
    </footer>
  );
}
