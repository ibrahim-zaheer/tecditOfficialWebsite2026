export interface Service {
  name: string;
  status: "available" | "roadmap";
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    name: "Website Development",
    status: "available",
    description:
      "A fast, mobile-friendly website designed to turn visitors into calls, bookings, and customers — built and launched by our team from day one.",
    points: [
      "Custom design, not a generic template",
      "Mobile-first and fast on every device",
      "Built for local search visibility",
      "Booking, quotes, or contact forms wired in",
    ],
  },
  {
    name: "AI Agents",
    status: "roadmap",
    description:
      "Automated assistants that answer common customer questions and capture leads around the clock, so you never miss a customer again.",
    points: [
      "Answers FAQs while you're busy with customers",
      "Captures leads outside business hours",
      "Hands off to you for anything that needs a human",
    ],
  },
  {
    name: "Marketing",
    status: "roadmap",
    description:
      "Ongoing local marketing support to keep new customers finding you — beyond just having a website.",
    points: [
      "Local search and Google Business optimization",
      "Social content built for local audiences",
      "Simple reporting on what's actually working",
    ],
  },
  {
    name: "POS",
    status: "roadmap",
    description:
      "A point-of-sale system that connects directly to your website, so bookings, orders, and payments live in one place.",
    points: [
      "Orders and bookings sync with your site",
      "Simple, staff-friendly checkout",
      "One system instead of five subscriptions",
    ],
  },
];
