import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "precision-auto-care",
    name: "Precision Auto Care",
    category: "Auto Repair Shop",
    industry: "Automotive",
    tag: "Automotive",
    status: "concept",
    summary:
      "A premium website built for a local auto repair business focused on increasing appointment bookings and building customer trust.",
    goals: [
      "Increase online appointments",
      "Build credibility",
      "Showcase certifications",
      "Improve local search visibility",
    ],
    features: [
      "Online Appointment Booking",
      "Service Pages",
      "Pricing Section",
      "Certifications Showcase",
      "Customer Reviews",
      "Google Maps",
      "Mobile Optimized",
      "Local SEO Ready",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Booking Integration", "Schema.org Local Business Markup"],
    outcome:
      "Designed to help convert website visitors into scheduled appointments through clear calls-to-action and a streamlined booking experience.",
    highlights: ["Mobile First", "Local SEO Ready", "Conversion Focused"],
    palette: ["#10151c", "#1b2430", "#e11d2e", "#f4f5f7"],
    typography: { heading: "Sora", body: "Inter" },
    designApproach:
      "A confident, workshop-inspired palette of charcoal and racing red signals precision and reliability at a glance, while generous whitespace and large tap targets keep the booking flow effortless on a phone held with one greasy hand.",
    uxHighlights: [
      "Sticky 'Book Now' bar on mobile so booking is always one tap away",
      "Service pages structured around price transparency to pre-qualify calls",
      "Certification badges placed above the fold to build instant trust",
    ],
    seoStrategy: [
      "City + service-based landing pages (e.g. 'Brake Repair in [City]')",
      "Local Business schema markup for rich Google results",
      "Optimized Google Business Profile alignment",
    ],
    conversionStrategy: [
      "Above-the-fold booking CTA on every page",
      "Reviews surfaced near every major decision point",
      "Clear pricing to reduce booking hesitation",
    ],
    gradient: ["#10151c", "#e11d2e"],
    ctaLabel: "View Project",
    liveUrl: "https://precisionautocares.netlify.app/",
    screenshots: {
      desktop: "/projects/precision-auto-care-desktop.png",
      mobile: "/projects/precision-auto-care-mobile.png",
    },
  },
  {
    slug: "ironcore-fitness",
    name: "IronCore Fitness",
    category: "Fitness Gym",
    industry: "Health & Fitness",
    tag: "Health & Fitness",
    status: "concept",
    summary:
      "A modern, high-energy gym website designed to maximize membership sign-ups and showcase premium fitness services.",
    goals: [
      "Increase memberships",
      "Promote trainers",
      "Showcase facilities",
      "Encourage free trial registrations",
    ],
    features: [
      "Membership Plans",
      "Trainer Profiles",
      "Class Schedule",
      "Transformation Gallery",
      "Online Registration",
      "Mobile Responsive",
      "SEO Optimized",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Class Scheduling Integration", "Image Gallery"],
    outcome:
      "Built to inspire confidence, increase member engagement, and convert visitors into paying members.",
    highlights: ["High Performance", "Fast Loading", "Conversion Focused"],
    palette: ["#0d0d0f", "#1c1c1f", "#ff6a3d", "#f5f5f5"],
    typography: { heading: "Sora", body: "Inter" },
    designApproach:
      "Bold black backdrops with a high-energy orange accent create the same adrenaline a visitor would feel walking into the gym, while every section is built around a single question: what does it take to get this person to their first free class?",
    uxHighlights: [
      "Transformation gallery placed early to build immediate belief",
      "Trainer profiles with specialties, not just headshots, to build rapport pre-visit",
      "One-tap free trial registration from every page",
    ],
    seoStrategy: [
      "Location + class-type landing pages for local gym searches",
      "Fast Core Web Vitals to support local map pack ranking",
      "Structured data for classes and business hours",
    ],
    conversionStrategy: [
      "Free trial CTA repeated at every scroll milestone",
      "Class schedule visible without extra clicks",
      "Social proof via transformation stories, not generic testimonials",
    ],
    gradient: ["#0d0d0f", "#ff6a3d"],
    ctaLabel: "View Project",
    liveUrl: "https://ironcores.netlify.app/",
    screenshots: {
      desktop: "/projects/ironcore-fitness-desktop.png",
      mobile: "/projects/ironcore-fitness-mobile.png",
    },
  },
  {
    slug: "flowfix-plumbing",
    name: "FlowFix Plumbing",
    category: "Plumbing Company",
    industry: "Home Services",
    tag: "Home Services",
    status: "concept",
    summary:
      "A conversion-focused plumbing website created to help homeowners quickly request quotes and contact emergency plumbing services.",
    goals: [
      "Generate quote requests",
      "Increase emergency calls",
      "Build trust",
      "Improve local visibility",
    ],
    features: [
      "Emergency Call CTA",
      "Quote Request Form",
      "Service Areas",
      "Pricing",
      "Testimonials",
      "Google Maps",
      "Mobile Optimized",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Click-to-Call", "Service Area Map"],
    outcome:
      "Designed to generate more phone calls and quote requests through strategic CTAs and a customer-focused user experience.",
    highlights: ["Mobile First", "Fast Loading", "Responsive Design"],
    palette: ["#0b3d91", "#123a6b", "#1fb6d6", "#f2f7fb"],
    typography: { heading: "Sora", body: "Inter" },
    designApproach:
      "Deep blues paired with a clean aqua accent read as dependable and clean, exactly what a homeowner wants to feel before letting someone into their house, while the entire layout is built around one bias: someone landing on this site has a problem right now.",
    uxHighlights: [
      "Emergency call button fixed to the screen on mobile at all times",
      "Service-area map so homeowners self-qualify in seconds",
      "Quote form kept to four fields to minimize drop-off",
    ],
    seoStrategy: [
      "Emergency + service + city page structure for high-intent searches",
      "Google Business Profile and Maps integration for local pack visibility",
      "Fast-loading, mobile-first build for Google's mobile ranking signals",
    ],
    conversionStrategy: [
      "Emergency call CTA visually separated from routine quote requests",
      "Transparent pricing ranges to reduce call hesitation",
      "Trust badges and testimonials near every form",
    ],
    gradient: ["#0b3d91", "#1fb6d6"],
    ctaLabel: "View Project",
    liveUrl: "https://flowfixed.netlify.app/",
    screenshots: {
      desktop: "/projects/flowfix-plumbing-desktop.png",
      mobile: "/projects/flowfix-plumbing-mobile.png",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  return { next, previous };
}
