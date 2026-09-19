import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BsaCalculator } from "@/components/calc/BsaCalculator";
import { BSA_FORMULAS } from "@/lib/bsa";
import { bsaFaqItems } from "@/data/bsaFaq";
import { CAL_LINK } from "@/lib/cal";

const siteUrl = "https://www.tecdit.com";
const pageUrl = `${siteUrl}/calc/body-surface-area-calculator`;
const pageTitle = "Body Surface Area (BSA) Calculator";
const pageDescription =
  "Calculate body surface area instantly using 9 formulas including Mosteller, Du Bois and Haycock. Free BSA calculator with unit conversion and charts.";
const lastUpdated = "September 20, 2026";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "body surface area calculator",
    "bsa calculator",
    "bsa formula",
    "mosteller formula",
    "dubois formula",
    "bsa calculator for chemotherapy",
    "bsa chart by age",
    "body surface area formula",
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

const ageReference = [
  { group: "Newborn", value: "≈ 0.25 m²" },
  { group: "2-year-old", value: "≈ 0.5 m²" },
  { group: "10-year-old", value: "≈ 1.14 m²" },
  { group: "Adult female", value: "≈ 1.6 m²" },
  { group: "Adult male", value: "≈ 1.9 m²" },
];

const formulaDetails: Record<
  string,
  { formula: string; published: string; text: string }
> = {
  mosteller: {
    formula: "BSA = √( (W × H) / 3600 )",
    published: "Mosteller, 1987",
    text: "Published by Dr. R.D. Mosteller in 1987, this is the simplest BSA formula to compute by hand and the one most commonly used in modern clinical software and calculators. It produces results very close to Du Bois for typical adult body sizes, which is why it's treated as the default clinical formula today.",
  },
  dubois: {
    formula: "BSA = 0.007184 × W^0.425 × H^0.725",
    published: "Du Bois & Du Bois, 1916",
    text: "Derived by Dr. Delafield Du Bois and Eugene Du Bois from direct surface measurements of just nine people, this 1916 formula became the original clinical standard. Over a century later, it's still the most widely cited BSA formula in published research.",
  },
  haycock: {
    formula: "BSA = 0.024265 × W^0.5378 × H^0.3964",
    published: "Haycock, Schwartz & Wisotsky, 1978",
    text: "Published in 1978, this formula was validated specifically across infants, children, and adults, and is generally preferred in pediatric contexts where Du Bois and Mosteller may be less reliable.",
  },
  "gehan-george": {
    formula: "BSA = 0.0235 × W^0.51456 × H^0.42246",
    published: "Gehan & George, 1970",
    text: "Developed in 1970 from a larger and more diverse dataset than Du Bois's original study, this formula appears frequently in oncology chemotherapy-dosing literature as an alternative to Du Bois.",
  },
  boyd: {
    formula: "BSA = 0.0333 × W^(0.6157 − 0.0188 × log₁₀W) × H^0.3",
    published: "Boyd, 1935",
    text: "Edith Boyd's 1935 formula is unusual in that the weight exponent itself changes with weight, an attempt to better account for how surface area scales at different body sizes. It remains an early, less commonly used alternative to Du Bois.",
  },
  fujimoto: {
    formula: "BSA = 0.008883 × W^0.444 × H^0.663",
    published: "Fujimoto et al., 1968",
    text: "Derived from measurements of Japanese adults and published in 1968, the Fujimoto formula is sometimes preferred in East Asian clinical literature over Western-derived formulas like Du Bois.",
  },
  takahira: {
    formula: "BSA = 0.007241 × W^0.425 × H^0.725",
    published: "Fujimoto et al., 1968",
    text: "Published alongside the Fujimoto formula from the same 1968 Japanese study, Takahira's equation uses the same exponents as Du Bois with a slightly different constant, making it a close regional variant of the original 1916 formula.",
  },
  "schlich-male": {
    formula: "BSA = 0.000579479 × W^0.38 × H^1.24",
    published: "Schlich, Schumm & Schlich, 2010",
    text: "Published in 2010, this is the most recent formula on this page, derived from 3-D body-scan data rather than manual measurement, with separate equations for men and women.",
  },
  "schlich-female": {
    formula: "BSA = 0.000975482 × W^0.46 × H^1.08",
    published: "Schlich, Schumm & Schlich, 2010",
    text: "The female counterpart to the Schlich male equation above, also derived from 3-D body-scan measurements taken in the same 2010 study.",
  },
};

const references = [
  {
    text: "Du Bois D, Du Bois EF. “A formula to estimate the approximate surface area if height and weight be known.” Arch Intern Med. 1916;17(6):863–871.",
    href: "https://pubmed.ncbi.nlm.nih.gov/2520314/",
    label: "PMID 2520314",
  },
  {
    text: "Mosteller RD. “Simplified calculation of body-surface area.” N Engl J Med. 1987;317:1098.",
    href: "https://pubmed.ncbi.nlm.nih.gov/3657876/",
    label: "PMID 3657876",
  },
  {
    text: "Haycock GB, Schwartz GJ, Wisotsky DH. “Geometric method for measuring body surface area: a height-weight formula validated in infants, children and adults.” J Pediatr. 1978;93:62–66.",
  },
  {
    text: "Gehan EA, George SL. “Estimation of human body surface area from height and weight.” Cancer Chemother Rep. 1970;54:225–235.",
  },
  {
    text: "Boyd E. The Growth of the Surface Area of the Human Body. University of Minnesota Institute of Child Welfare Monograph Series No. X. Oxford University Press, 1935.",
  },
  {
    text: "Fujimoto S, et al. “Studies on the physical surface area of Japanese. 18.” Nippon Eiseigaku Zasshi. 1968;5:443–450 (also the source of the Takahira formula).",
  },
  {
    text: "Schlich E, Schumm M, Schlich M. “3-D-Body-Scan als anthropometrisches Verfahren zur Bestimmung der Körperoberfläche.” Ernährungs Umschau. 2010;57:178–183.",
  },
];

export default function BodySurfaceAreaCalculatorPage() {
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Body Surface Area Calculator",
    url: pageUrl,
    description: pageDescription,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${siteUrl}/calc` },
      { "@type": "ListItem", position: 3, name: pageTitle, item: pageUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bsaFaqItems.map((item) => ({
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
                Body Surface Area Calculator
              </li>
            </ol>
          </nav>

          <h1 className="font-display mt-6 text-balance text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            Body Surface Area (BSA) Calculator
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ink-500">
            Body surface area (BSA) is an estimate of the total surface area
            of the human body, calculated from height and weight rather than
            measured directly. Clinicians use it instead of weight alone
            because it correlates more closely with metabolic rate, blood
            volume, and cardiac output, which makes it a more reliable way to
            scale drug doses, IV fluids, and other treatments across patients
            of different sizes. This calculator is provided for informational
            and educational use only and is not a substitute for a
            professional medical calculation or a clinician&apos;s judgment.
          </p>

          <div className="mt-10">
            <BsaCalculator />
          </div>

          <section className="mt-16" aria-labelledby="age-reference-heading">
            <h2
              id="age-reference-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
            >
              Average BSA by age
            </h2>
            <p className="mt-3 leading-relaxed text-ink-500">
              These reference values show how average body surface area
              scales with age, from newborn to adult:
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted text-xs uppercase tracking-wide text-ink-400">
                    <th scope="col" className="py-3 px-4 font-semibold">
                      Age group
                    </th>
                    <th scope="col" className="py-3 px-4 font-semibold">
                      Average BSA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ageReference.map((row) => (
                    <tr key={row.group} className="border-b border-border/70 last:border-0">
                      <td className="py-3 px-4 font-medium text-ink-900">{row.group}</td>
                      <td className="py-3 px-4 tabular-nums text-ink-700">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-16" aria-labelledby="what-is-bsa-heading">
            <h2
              id="what-is-bsa-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
            >
              What is Body Surface Area?
            </h2>
            <div className="mt-4 flex flex-col gap-4 leading-relaxed text-ink-500">
              <p>
                Body surface area is a calculated estimate of how much skin
                covers the human body, expressed in square meters (m&sup2;).
                It can&apos;t be measured directly with any practical
                clinical tool, wrapping a person in a tape measure or
                scanning their entire surface isn&apos;t feasible in a
                hospital setting, so BSA is instead derived mathematically
                from height and weight using one of several validated
                formulas.
              </p>
              <p>
                The reason BSA is used instead of body weight alone comes
                down to physiology. Weight is a poor proxy for how a body
                actually processes drugs, fluids, and heat, because it
                doesn&apos;t account for the ratio of surface area to volume.
                A tall, lean person and a shorter, heavier person can weigh
                the same amount but have very different metabolic rates,
                blood volumes, and rates of heat loss. BSA correlates more
                closely with these physiological variables, including
                cardiac output, renal clearance, and basal metabolic rate,
                than weight does on its own, which is why it became the
                standard scaling factor for many medical calculations during
                the 20th century.
              </p>
              <p>
                Because BSA is estimated rather than measured, different
                formulas (derived from different study populations, at
                different points in history, using different measurement
                techniques) produce slightly different results for the same
                person. None of them is definitively correct, they&apos;re
                all approximations, and the differences between formulas are
                usually small enough to be clinically insignificant for most
                adults of average build.
              </p>
            </div>
          </section>

          <section className="mt-16" aria-labelledby="bsa-uses-heading">
            <h2
              id="bsa-uses-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
            >
              What is BSA used for?
            </h2>
            <p className="mt-4 leading-relaxed text-ink-500">
              BSA shows up most often in three clinical contexts:
            </p>
            <ul className="mt-4 flex flex-col gap-3 leading-relaxed text-ink-500">
              <li>
                <strong className="text-ink-900">
                  Drug dosing, especially chemotherapy.
                </strong>{" "}
                Many chemotherapy protocols calculate dose per square meter
                of BSA (e.g., &ldquo;175 mg/m&sup2;&rdquo;) rather than per
                kilogram of body weight, on the theory that BSA-based dosing
                better normalizes drug exposure and toxicity across patients
                of different sizes. This practice dates back to the 1950s and
                remains standard in oncology today.
              </li>
              <li>
                <strong className="text-ink-900">Cardiac index.</strong>{" "}
                Cardiac output (how much blood the heart pumps per minute) is
                divided by BSA to calculate cardiac index, which lets
                clinicians compare heart performance across patients of very
                different body sizes on a level playing field.
              </li>
              <li>
                <strong className="text-ink-900">
                  Burn assessment and fluid resuscitation.
                </strong>{" "}
                Burn severity is often expressed as a percentage of total
                body surface area affected, and BSA is used to calculate
                fluid replacement needs in burn patients.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-ink-500">
              It&apos;s worth being upfront about the limitations. BSA-based
              chemotherapy dosing has been debated in the oncology literature
              for decades, particularly for drugs with a narrow therapeutic
              index, two patients with an identical BSA can still metabolize
              and clear the same drug very differently, because BSA
              doesn&apos;t account for organ function, body composition, or
              genetic variation in drug metabolism. BSA formulas are also
              generally less accurate at the extremes of height and weight
              (very tall, very short, or significantly over- or
              under-weight), since most formulas were derived from
              average-sized adult populations. For these reasons, BSA is one
              input among several that a treating clinician weighs, not a
              formula to be applied mechanically.
            </p>
          </section>

          <section className="mt-16" aria-labelledby="bsa-formulas-heading">
            <h2
              id="bsa-formulas-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
            >
              BSA formulas explained
            </h2>
            <p className="mt-4 leading-relaxed text-ink-500">
              Every formula below takes weight in kilograms (W) and height in
              centimeters (H), and returns BSA in square meters. They differ
              in the study population they were derived from and the
              mathematical relationship each assumes between body size and
              surface area.
            </p>
            <div className="mt-8 flex flex-col gap-8">
              {BSA_FORMULAS.map((f) => {
                const detail = formulaDetails[f.key];
                return (
                  <div key={f.key}>
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      {f.label}
                    </h3>
                    <p className="mt-1.5 font-mono text-sm text-brand-700">
                      {detail.formula}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-400">
                      {detail.published}
                    </p>
                    <p className="mt-2 leading-relaxed text-ink-500">{detail.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-16" aria-labelledby="bsa-faq-heading">
            <h2
              id="bsa-faq-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
            >
              Frequently asked questions
            </h2>
            <div className="mt-8 flex flex-col gap-8">
              {bsaFaqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="font-display text-base font-semibold text-ink-900">
                    {item.question}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-500">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16" aria-labelledby="references-heading">
            <h2
              id="references-heading"
              className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
            >
              References
            </h2>
            <ol className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-ink-500">
              {references.map((ref) => (
                <li key={ref.text}>
                  {ref.text}
                  {ref.href && (
                    <>
                      {" "}
                      <a
                        href={ref.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
                      >
                        {ref.label}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-16 rounded-2xl border border-border bg-muted p-6">
            <p className="text-sm font-medium text-ink-900">
              Reviewed by the TecDit team &middot; Last updated {lastUpdated}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              This calculator is provided for informational and educational
              purposes only and is not a substitute for professional medical
              advice, diagnosis, or dosing decisions.
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
