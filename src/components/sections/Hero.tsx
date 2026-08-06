"use client";

import { motion } from "framer-motion";
import { ChevronDown, Zap, Search, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroShowcase } from "@/components/sections/HeroShowcase";
import { CAL_LINK } from "@/lib/cal";

const trustChips = [
  { icon: Smartphone, label: "Mobile-First Design" },
  { icon: Search, label: "Built to Get Found" },
  { icon: Zap, label: "Fast Turnaround" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[36rem] w-[36rem] rounded-full bg-brand-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-[-10%] -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-50 blur-3xl" />

      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="brand">Web Design for Local Businesses</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 text-balance text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            Every Day You&apos;re Not Found, a Competitor Gets the Call
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-ink-500"
          >
            We build websites that put you in front of customers who are
            already searching for what you offer, so the business goes to
            you, not whoever shows up first on Google.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button calLink={CAL_LINK} size="lg" showArrow>
              Book a Free Call
            </Button>
            <Button href="/#work" variant="secondary" size="lg">
              See Our Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-12 flex flex-wrap items-center gap-3"
          >
            {trustChips.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-ink-500"
              >
                <Icon className="size-3.5 text-brand-600" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroShowcase />
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-20 hidden justify-center sm:flex"
      >
        <a
          href="#industries"
          aria-label="Scroll to explore"
          className="flex size-10 items-center justify-center rounded-full border border-border text-ink-400 transition-colors hover:text-brand-600"
        >
          <ChevronDown className="size-4" />
        </a>
      </motion.div>
    </section>
  );
}
