export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Book a Free Call",
    description:
      "Tell us about your business and what you want your website to do — no pressure, no jargon.",
  },
  {
    number: "02",
    title: "We Design & Build",
    description:
      "You'll review a real design before anything goes live, with revisions built into every package.",
  },
  {
    number: "03",
    title: "You Approve & Launch",
    description:
      "Once it's right, we launch your site and make sure it's fast, mobile-ready, and easy to find.",
  },
  {
    number: "04",
    title: "We Keep It Running",
    description:
      "Optional ongoing care means updates, edits, and hosting are handled — so you can focus on your business.",
  },
];

export interface Differentiator {
  title: string;
  description: string;
}

export const differentiators: Differentiator[] = [
  {
    title: "Built for local businesses",
    description:
      "We don't do generic templates for generic businesses. Every site is built around how your customers actually find and book with you.",
  },
  {
    title: "Focused on results, not just looks",
    description:
      "A beautiful site that doesn't generate calls or bookings isn't doing its job. Every page is built around one goal: turning visitors into customers.",
  },
  {
    title: "No agency jargon",
    description:
      "You'll never need a technical dictionary to talk to us. We explain everything in plain language and keep you in the loop at every step.",
  },
  {
    title: "A team that's easy to reach",
    description:
      "No ticket queues, no runaround. When you need something updated or have a question, you'll talk to a real person who knows your site.",
  },
];
