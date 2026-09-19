export interface BsaFormula {
  key: string;
  label: string;
  citation: string;
  note: string;
  compute: (weightKg: number, heightCm: number) => number;
}

export const BSA_FORMULAS: BsaFormula[] = [
  {
    key: "mosteller",
    label: "Mosteller",
    citation: "Mosteller, 1987",
    note: "Simplest formula and the most common clinical default today.",
    compute: (w, h) => Math.sqrt((w * h) / 3600),
  },
  {
    key: "dubois",
    label: "Du Bois",
    citation: "Du Bois & Du Bois, 1916",
    note: "The original 1916 standard, still widely cited.",
    compute: (w, h) => 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725),
  },
  {
    key: "haycock",
    label: "Haycock",
    citation: "Haycock et al., 1978",
    note: "Validated specifically for infants and children.",
    compute: (w, h) => 0.024265 * Math.pow(w, 0.5378) * Math.pow(h, 0.3964),
  },
  {
    key: "gehan-george",
    label: "Gehan & George",
    citation: "Gehan & George, 1970",
    note: "Common in oncology chemotherapy dosing literature.",
    compute: (w, h) => 0.0235 * Math.pow(w, 0.51456) * Math.pow(h, 0.42246),
  },
  {
    key: "boyd",
    label: "Boyd",
    citation: "Boyd, 1935",
    note: "Uses a weight-dependent exponent; an early alternative to Du Bois.",
    compute: (w, h) =>
      0.03330 * Math.pow(w, 0.6157 - 0.0188 * Math.log10(w)) * Math.pow(h, 0.3),
  },
  {
    key: "fujimoto",
    label: "Fujimoto",
    citation: "Fujimoto et al., 1968",
    note: "Derived from measurements of Japanese adults.",
    compute: (w, h) => 0.008883 * Math.pow(w, 0.444) * Math.pow(h, 0.663),
  },
  {
    key: "takahira",
    label: "Takahira",
    citation: "Fujimoto et al., 1968",
    note: "Close variant of Du Bois from the same Japanese study.",
    compute: (w, h) => 0.007241 * Math.pow(w, 0.425) * Math.pow(h, 0.725),
  },
  {
    key: "schlich-male",
    label: "Schlich (male)",
    citation: "Schlich, Schumm & Schlich, 2010",
    note: "Separate male equation from 3-D body-scan data.",
    compute: (w, h) => 0.000579479 * Math.pow(w, 0.38) * Math.pow(h, 1.24),
  },
  {
    key: "schlich-female",
    label: "Schlich (female)",
    citation: "Schlich, Schumm & Schlich, 2010",
    note: "Separate female equation from 3-D body-scan data.",
    compute: (w, h) => 0.000975482 * Math.pow(w, 0.46) * Math.pow(h, 1.08),
  },
];

export function getMostellerBsa(weightKg: number, heightCm: number): number {
  return Math.sqrt((weightKg * heightCm) / 3600);
}

export const KG_PER_LB = 0.453592;
export const CM_PER_IN = 2.54;

export function lbToKg(lb: number): number {
  return lb * KG_PER_LB;
}

export function inToCm(inches: number): number {
  return inches * CM_PER_IN;
}
