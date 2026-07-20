"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Clock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const reassurances = [
  { icon: Clock, label: "We reply within 1 business day" },
  { icon: ShieldCheck, label: "No pressure, no obligation" },
  { icon: Mail, label: "Straight answers, in plain language" },
];

export function BookACall() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="book-a-call" className="relative overflow-hidden bg-ink-900 py-24 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-3xl" />

      <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
              Book a Free Call
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s Talk About Your Website
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-white/60 sm:text-lg">
              Tell us a bit about your business. We&apos;ll get on a free call,
              understand what you need, and show you exactly how we&apos;d
              approach your website — no pressure, no obligation.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-col gap-4">
              {reassurances.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
                    <Icon className="size-4 text-brand-300" />
                  </span>
                  <span className="text-sm text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="rounded-3xl bg-white p-7 shadow-2xl sm:p-9">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-14 text-center"
              >
                <CheckCircle2 className="size-12 text-brand-600" />
                <h3 className="font-display mt-5 text-xl font-semibold text-ink-900">
                  Thanks — request received.
                </h3>
                <p className="mt-2 max-w-xs text-sm text-ink-500">
                  We&apos;ll reach out within one business day to schedule your
                  free call.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" name="name" type="text" placeholder="Jane Smith" required />
                  <Field
                    label="Business Name"
                    name="business"
                    type="text"
                    placeholder="Jane's Cafe"
                    required
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="jane@business.com"
                    required
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-ink-700">
                    What can we help with?
                  </span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us a bit about your business and what you're looking for."
                    className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brand-500"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-1 inline-flex h-12 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700 active:scale-[0.98]"
                >
                  Request My Free Call
                </button>
                <p className="text-center text-xs text-ink-400">
                  Prefer email? Reach us directly at{" "}
                  <a href="mailto:hello@tecdit.com" className="font-medium text-brand-600">
                    hello@tecdit.com
                  </a>
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 rounded-xl border border-border bg-white px-4 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brand-500"
      />
    </label>
  );
}
