export interface Service {
  name: string;
  description: string;
  points: string[];
}

export const service: Service = {
  name: "Website Development",
  description:
    "A fast, mobile-friendly website designed to turn visitors into calls, bookings, and customers, built and launched by our team from day one.",
  points: [
    "Custom design, not a generic template",
    "Mobile-first and fast on every device",
    "Set up to get found by customers already searching for you",
    "Booking, quotes, or contact forms wired in",
  ],
};
