export interface PricingTier {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  features: string[];
  featured?: boolean;
  ctaLabel: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$499",
    description: "A clean, professional presence for businesses just getting online.",
    features: [
      "5–6 pages",
      "Mobile-responsive design",
      "Contact form",
      "Google Maps integration",
      "Basic local SEO setup",
      "1-week turnaround",
    ],
    ctaLabel: "Get Started",
  },
  {
    name: "Growth",
    price: "$1,099",
    description: "For businesses ready to turn their website into a booking machine.",
    features: [
      "Everything in Starter",
      "10–12 pages",
      "Online booking or appointments",
      "Professional copywriting",
      "On-page + local SEO",
      "Google Business Profile setup",
      "3 rounds of revisions",
    ],
    featured: true,
    ctaLabel: "Get Started",
  },
  {
    name: "Custom",
    price: "Custom Quote",
    description:
      "A fully custom, growth-ready site built entirely around your specific requirements — no fixed page count.",
    features: [
      "Everything in Growth",
      "Fully custom design",
      "Advanced booking or light e-commerce",
      "Blog / content system",
      "Speed optimization",
      "30-day post-launch support",
    ],
    ctaLabel: "Get Started",
  },
];

export const carePlan = {
  name: "Care Plan",
  price: "$29/mo",
  description:
    "Hosting, updates, edits, and backups — so your site stays fast, secure, and current without lifting a finger.",
};
