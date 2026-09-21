import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NavyBodyFatCalculator } from "@/components/calc/NavyBodyFatCalculator";
import { RelatedTools } from "@/components/calc/RelatedTools";
import { navyFaqItems } from "@/data/navyFaq";
import { BODY_FAT_CATEGORIES, NAVY_STANDARDS } from "@/lib/navyBodyFat";
import { CAL_LINK } from "@/lib/cal";

const siteUrl = "https://www.tecdit.com";
const pageUrl = `${siteUrl}/calc/navy-body-fat-calculator`;
const pageTitle = "Navy Body Fat Calculator (Male & Female)";
const pageDescription =
  "Calculate your body fat percentage using the official US Navy method. Free calculator for men and women with standards chart and measurement guide.";
const lastUpdated = "September 22, 2026";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "navy body fat calculator",
    "navy body fat calculator male",
    "navy body fat calculator female",
    "us navy body fat formula",
    "navy body fat standards",
    "how to calculate body fat navy method",
    "navy body fat percentage",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    siteName: "TecDit",
    title: `${pageTitle} | TecDit`,
    description: pageDescription,
    images: ["/logo.jpeg"],
  },
  twitter: {
    card: "summary",
    title: `${pageTitle} | TecDit`,
    description: pageDescription,
    images: ["/logo.jpeg"],
  },
};

const formulas = [
  {
    title: "Men, inches",
    body: "BF% = 86.010 × log₁₀(waist − neck) − 70.041 × log₁₀(height) + 36.76",
  },
  {
    title: "Women, inches",
    body: "BF% = 163.205 × log₁₀(waist + hip − neck) − 97.684 × log₁₀(height) − 78.387",
  },
  {
    title: "Men, centimeters",
    body: "BF% = 495 / (1.0324 − 0.19077 × log₁₀(waist − neck) + 0.15456 × log₁₀(height)) − 450",
  },
  {
    title: "Women, centimeters",
    body: "BF% = 495 / (1.29579 − 0.35004 × log₁₀(waist + hip − neck) + 0.22100 × log₁₀(height)) − 450",
  },
];

const references = [
  "Hodgdon JA, Beckett MB. “Prediction of Percent Body Fat for U.S. Navy Men from Body Circumferences and Height.” Naval Health Research Center, San Diego, CA; 1984.",
  "Hodgdon JA, Beckett MB. “Prediction of Percent Body Fat for U.S. Navy Women from Body Circumferences and Height.” Naval Health Research Center, San Diego, CA; 1984.",
];

const h2Class =
  "font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl";
const thClass = "py-3 px-4 font-semibold";
const tdClass = "py-3 px-4 tabular-nums text-ink-700";

export default function NavyBodyFatCalculatorPage() {
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Navy Body Fat Calculator",
    url: pageUrl,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online calculator that estimates body fat percentage from height, neck, waist, and hip measurements using the US Navy circumference method.",
    publisher: {
      "@type": "Organization",
      name: "TECDIT",
      url: siteUrl,
    },
  };

  // Names below must match the visible breadcrumb trail exactly (see <nav aria-label="Breadcrumb"> below).
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/calc` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Navy Body Fat Calculator",
        item: pageUrl,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: navyFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="pt-28 pb-24 sm:pt-32">
        <Container className="max-w-3xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
              <li className="flex items-center gap-1.5">
                <Link href="/" className="transition-colors hover:text-brand-600">
                  Home
                </Link>
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </li>
              <li className="flex items-center gap-1.5">
                <Link href="/calc" className="transition-colors hover:text-brand-600">
                  Tools
                </Link>
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </li>
              <li aria-current="page" className="font-medium text-ink-900">
                Navy Body Fat Calculator
              </li>
            </ol>
          </nav>

          <h1 className="font-display mt-6 text-balance text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            US Navy Body Fat Calculator
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ink-500">
            The US Navy method estimates your body fat percentage with a tape
            measure instead of calipers, scales, or scans. You enter your
            height plus a few circumferences (neck and waist for men; neck,
            waist, and hips for women) and a published equation turns them
            into an estimate. This calculator runs the equation in your
            browser, then shows how your result compares with general body fat
            ranges and, if you add your age, the Navy&apos;s own maximum
            standards. It is for informational and educational use only.
          </p>

          <div className="mt-10">
            <NavyBodyFatCalculator />
          </div>

          <section className="mt-16" aria-labelledby="measure-heading">
            <h2 id="measure-heading" className={h2Class}>
              How to take your measurements
            </h2>
            <p className="mt-4 leading-relaxed text-ink-500">
              Your result is only as good as your measurements, and a small
              error in the neck or waist moves the answer more than most
              people expect. A few minutes of care here is worth it.
            </p>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-ink-500">
              <li>
                Use a flexible, non-stretch tape, such as a cloth or
                fiberglass tailor&apos;s tape. Stretchy tapes and stiff metal
                tapes both give poor readings.
              </li>
              <li>
                Measure against bare skin or very thin clothing, standing
                relaxed with your weight even on both feet.
              </li>
              <li>
                Keep the tape level with the floor all the way around, snug
                against the skin without pressing into it.
              </li>
              <li>
                Measure at the end of a normal exhale. Don&apos;t pull your
                stomach in or flex.
              </li>
              <li>
                Take each measurement three times and use the average. If
                your readings differ by more than about a quarter inch (half
                a centimeter), measure again.
              </li>
              <li>
                If you are tracking change over weeks, measure at the same
                time of day, such as first thing in the morning.
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-6">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  Height
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">
                  Stand barefoot with your heels, back, and head against a
                  wall and look straight ahead. Rest a flat object on top of
                  your head, mark the wall, and measure from the floor to the
                  mark.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  Neck
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">
                  Place the tape just below the larynx (Adam&apos;s apple),
                  sloping very slightly downward toward the front. Keep your
                  shoulders relaxed and don&apos;t flare your neck muscles or
                  hunch forward.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  Abdomen (men)
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">
                  Wrap the tape horizontally around your abdomen at the level
                  of your navel.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  Waist (women)
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">
                  Measure around the narrowest point of your torso, usually
                  above the navel. If there is no obvious narrowing, measure
                  at the navel.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  Hips (women)
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">
                  With your feet together, measure around the widest part of
                  your hips and buttocks.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16" aria-labelledby="formula-heading">
            <h2 id="formula-heading" className={h2Class}>
              The Navy body fat formula
            </h2>
            <p className="mt-4 leading-relaxed text-ink-500">
              The method converts your measurements into a body fat
              percentage with the equations below. Height, neck, waist, and
              hip are all entered in the same unit: inches for the first
              pair, centimeters for the second. For men, &ldquo;waist&rdquo;
              means the abdomen measurement taken at the navel.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {formulas.map((f) => (
                <div key={f.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    {f.title}
                  </h3>
                  <pre className="mt-1.5 overflow-x-auto rounded-xl border border-border bg-muted p-4 font-mono text-[13px] leading-relaxed text-brand-700">
                    {f.body}
                  </pre>
                </div>
              ))}
            </div>
            <p className="mt-6 leading-relaxed text-ink-500">
              In plain terms, a larger waist relative to your neck and height
              means a higher estimated body fat, and the logarithm captures
              that this relationship is not a straight line. The inch and
              centimeter versions use different constants and are not
              interchangeable: feeding centimeters into the inch formula, or
              the reverse, produces results several percentage points off.
              Because the two versions are not exact conversions of each
              other, the same person can see results a few tenths of a point
              apart depending on the unit used. This calculator always
              applies the formula that matches the unit you select.
            </p>
          </section>

          <section className="mt-16" aria-labelledby="standards-heading">
            <h2 id="standards-heading" className={h2Class}>
              US Navy body fat standards
            </h2>
            <p className="mt-4 leading-relaxed text-ink-500">
              The Navy sets a maximum allowable body fat percentage by sex
              and age group. These are the figures this calculator uses:
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[360px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  US Navy maximum allowable body fat percentage by age and sex
                </caption>
                <thead>
                  <tr className="border-b border-border bg-muted text-xs uppercase tracking-wide text-ink-400">
                    <th scope="col" className={thClass}>
                      Age
                    </th>
                    <th scope="col" className={thClass}>
                      Men (max)
                    </th>
                    <th scope="col" className={thClass}>
                      Women (max)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {NAVY_STANDARDS.map((row) => (
                    <tr key={row.label} className="border-b border-border/70 last:border-0">
                      <th scope="row" className="py-3 px-4 text-left font-medium text-ink-900">
                        {row.label}
                      </th>
                      <td className={tdClass}>{row.male}%</td>
                      <td className={tdClass}>{row.female}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 leading-relaxed text-ink-500">
              If you enter your age in the calculator, it tells you whether
              your result is within or above the maximum for your group. That
              is an informational comparison only. Standards get revised, and
              an official assessment follows the Navy&apos;s own procedure
              and current Physical Readiness Program documents, so verify
              against those if a number affects your service.
            </p>
          </section>

          <section className="mt-16" aria-labelledby="categories-heading">
            <h2 id="categories-heading" className={h2Class}>
              Body fat percentage categories
            </h2>
            <p className="mt-4 leading-relaxed text-ink-500">
              If you are not in the military, the Navy&apos;s maximums are
              not the most useful yardstick. These commonly published ranges,
              similar to those from the American Council on Exercise, put
              your number in plain-language context:
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[360px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  General body fat percentage categories for men and women
                </caption>
                <thead>
                  <tr className="border-b border-border bg-muted text-xs uppercase tracking-wide text-ink-400">
                    <th scope="col" className={thClass}>
                      Category
                    </th>
                    <th scope="col" className={thClass}>
                      Men
                    </th>
                    <th scope="col" className={thClass}>
                      Women
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BODY_FAT_CATEGORIES.map((row) => (
                    <tr key={row.label} className="border-b border-border/70 last:border-0">
                      <th scope="row" className="py-3 px-4 text-left font-medium text-ink-900">
                        {row.label}
                      </th>
                      <td className={tdClass}>{row.male}</td>
                      <td className={tdClass}>{row.female}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 leading-relaxed text-ink-500">
              Essential fat is the minimum your body needs to function. It is
              not a target for most people, and staying at that level can be
              unhealthy. Ranges vary by source, age, and goals, and
              &ldquo;average&rdquo; is not the same as &ldquo;ideal.&rdquo;
              Body fat is one health indicator among many, so talk to a
              clinician about your own situation.
            </p>
          </section>

          <section className="mt-16" aria-labelledby="accuracy-heading">
            <h2 id="accuracy-heading" className={h2Class}>
              How accurate is the Navy method?
            </h2>
            <div className="mt-4 flex flex-col gap-4 leading-relaxed text-ink-500">
              <p>
                The Navy method is a screening estimate, not a laboratory
                measurement. The commonly reported margin of error is around
                3–4 percentage points, so a result of 18% could plausibly
                reflect a true value anywhere from roughly 14% to 22%.
                Methods such as DEXA scans and underwater weighing are more
                precise but need equipment and an appointment, while the Navy
                method needs only a tape measure.
              </p>
              <p>It is less reliable in a few situations:</p>
            </div>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-ink-500">
              <li>
                <strong className="text-ink-900">Very muscular people.</strong>{" "}
                A thick neck or waist can be muscle rather than fat, which
                skews the estimate.
              </li>
              <li>
                <strong className="text-ink-900">
                  Very lean or very high body fat.
                </strong>{" "}
                The equations were derived from samples of Navy personnel and
                fit less well at the extremes.
              </li>
              <li>
                <strong className="text-ink-900">Measurement error.</strong>{" "}
                Tape placement, tension, posture, and breathing all matter,
                and a quarter inch can change the result noticeably.
              </li>
              <li>
                <strong className="text-ink-900">Different body shapes.</strong>{" "}
                People who carry fat mainly in the hips, arms, or legs rather
                than the abdomen may be estimated less accurately.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-ink-500">
              Its best use is as a low-cost way to track change over time,
              measuring the same way each time. A trend over several weeks is
              more informative than any single number. It is not a diagnosis,
              and anyone with health concerns should consult a qualified
              professional.
            </p>
          </section>

          <section className="mt-16" aria-labelledby="navy-faq-heading">
            <h2 id="navy-faq-heading" className={h2Class}>
              Frequently asked questions
            </h2>
            <div className="mt-8 flex flex-col gap-8">
              {navyFaqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="font-display text-base font-semibold text-ink-900">
                    {item.question}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-500">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16" aria-labelledby="navy-references-heading">
            <h2 id="navy-references-heading" className={h2Class}>
              References
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
              The circumference method originates from the studies below and
              is the method used in the Navy&apos;s Physical Readiness
              Program for body composition assessment.
            </p>
            <ol className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-ink-500">
              {references.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ol>
          </section>

          <RelatedTools currentHref="/calc/navy-body-fat-calculator" />

          <div className="mt-16 rounded-2xl border border-border bg-muted p-6">
            <p className="text-sm font-medium text-ink-900">
              Reviewed by the TecDit team &middot; Last updated {lastUpdated}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              This calculator is provided for informational and educational
              purposes only and is not a substitute for professional fitness
              or medical assessment.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-500">
              Need a website that&apos;s actually built to be found on
              Google?
            </p>
            <Button calLink={CAL_LINK} size="md">
              Book a Free Call
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
