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
      "Set up to get found by local customers searching for you",
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
      "Optimized to outrank competitors in local search",
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
      "A fully custom, growth-ready site built entirely around your specific requirements, with no fixed page count.",
    features: [
      "Everything in Growth",
      "Fully custom design",
      "Advanced booking or light e-commerce",
      "Blog / content system",
      "Fast enough that customers don't leave before they call",
      "30-day post-launch support",
    ],
    ctaLabel: "Get Started",
  },
];

export const carePlan = {
  name: "Care Plan",
  price: "$29/mo",
  description:
    "Hosting, updates, edits, and backups, so your site stays fast, secure, and current without lifting a finger.",
};

export const visibilityPackage = {
  name: "Visibility Package",
  price: "Ask for pricing",
  description:
    "Stop losing customers to competitors who just show up first. Ongoing work to keep you visible as new customers search every month, including visibility in AI search tools like ChatGPT and Google's AI Overviews, where more customers are starting to look.",
  features: [
    "Monthly tracking of what customers are searching for in your area",
    "Ongoing optimization so you keep climbing instead of stalling after launch",
    "Visibility in AI search tools (ChatGPT, Gemini, AI Overviews)",
    "Simple monthly report: what's working, what's changed, what it means for your bookings",
  ],
};
