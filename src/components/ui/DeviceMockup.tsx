"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

function SiteSkeleton({ gradient }: { gradient: [string, string] }) {
  return (
    <div
      className="relative flex h-full w-full flex-col gap-[6%] overflow-hidden p-[7%]"
      style={{
        background: `linear-gradient(155deg, ${gradient[0]} 0%, ${gradient[0]} 55%, ${gradient[1]} 145%)`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="h-[8%] w-[22%] rounded-full bg-white/90" />
        <div className="flex gap-[6%]">
          <div className="h-[6%] w-[10%] rounded-full bg-white/30" />
          <div className="h-[6%] w-[10%] rounded-full bg-white/30" />
          <div className="h-[6%] w-[16%] rounded-full bg-white/90" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-[8%]">
        <div className="h-[12%] w-[70%] rounded-lg bg-white/95" />
        <div className="h-[12%] w-[50%] rounded-lg bg-white/95" />
        <div className="h-[7%] w-[35%] rounded-full bg-white" style={{ marginTop: "4%" }} />
      </div>

      <div className="grid grid-cols-3 gap-[5%]">
        <div className="aspect-square rounded-xl bg-white/15 backdrop-blur-sm" />
        <div className="aspect-square rounded-xl bg-white/25 backdrop-blur-sm" />
        <div className="aspect-square rounded-xl bg-white/15 backdrop-blur-sm" />
      </div>
    </div>
  );
}

function CrossfadeImage({
  image,
  alt,
  sizes,
  priority,
}: {
  image: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key={image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export function BrowserMockup({
  gradient,
  image,
  alt = "",
  className,
  priority = false,
}: {
  gradient: [string, string];
  image?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_30px_60px_-24px_rgba(15,20,35,0.35)]",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f6f7fb] px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 h-5 w-2/3 rounded-full bg-white" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {image ? (
          <CrossfadeImage
            image={image}
            alt={alt}
            sizes="(min-width: 1024px) 640px, 90vw"
            priority={priority}
          />
        ) : (
          <SiteSkeleton gradient={gradient} />
        )}
      </div>
    </div>
  );
}

export function PhoneMockup({
  gradient,
  image,
  alt = "",
  className,
}: {
  gradient: [string, string];
  image?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border-[6px] border-ink-900 bg-ink-900 shadow-[0_30px_50px_-20px_rgba(15,20,35,0.45)]",
        className
      )}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.4rem]">
        <div className="absolute left-1/2 top-1.5 z-10 h-3 w-16 -translate-x-1/2 rounded-full bg-ink-900" />
        {image ? (
          <CrossfadeImage image={image} alt={alt} sizes="180px" />
        ) : (
          <SiteSkeleton gradient={gradient} />
        )}
      </div>
    </div>
  );
}
